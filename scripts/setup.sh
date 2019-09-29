#!/bin/sh

ARCH=$(uname -m)
OS=$(uname -s)
SUPPORTED_OS="Darwin Linux"

showHelp() {
    cat << EOF

Specific options to install only specific requirement.
    [default / no option] install all of below

    -c config
    -g Go (and goformat)
    -n nim
    -p Please
    -q PostgreSQL
    -s shellcheck
    -y node (and yarn)

    -h Display this menu

Note: You will need to have all the requirements installed for the
    program to run properly.

EOF
}

config() {
    CURRENT=$(pwd | awk -F'/' '{print $NF}')
    CONFIG_FILE="config/psql.config"

    if [ "$CURRENT" != "GlobeTrotte" ]; then
        echo "Invalid location. Config file not set up."
        echo "Please run this script again (with -c option) from the top level folder of the project."
        return
    fi

    if [ -e "$CONFIG_FILE" ]; then
        echo "Seems like \`config/psql.config\` file already exist. Skipping..."
        return
    fi

    sudo -u postgres psql -w -c "CREATE ROLE $USER WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'test';"
    sudo -u postgres psql -w -c "CREATE DATABASE $USER"
    psql --username="$USER" -w -c "CREATE DATABASE globetrotte;"

    touch "$CONFIG_FILE"
    {
        echo "host:localhost"
        echo "port:5432"
        echo "user:$USER"
        echo "password:test"
        echo "dbname:globetrotte"
    } >> "$CONFIG_FILE"

    echo "Please verify and make sure the information in psql.config file is accurate."
}

installGo() {
    TEST_GO=$(go version)

    if [ "$TEST_GO" != "" ]; then
        echo "Seems like \`go\` is already installed. Skipping..."
        return
    fi

    GO_VERSION="1.13.1"

    case $ARCH in
        "x86_64")
            ARCH="amd64"
            ;;
        "x86")
            ARCH="386"
            ;;
        "ARMv6")
            ARCH="armv6l"
            ;;
        "ARMv8")
            ARCH="armv64"
            ;;
        "ppx64le")
            ARCH="ppx64le"
            ;;
        "s390x")
            ARCH="s390x"
            ;;
        *)
            echo "Unsupported system architechture. Halting installation..."
            exit 1
            ;;
    esac

    case $OS in
        "Darwin")
            os="darwin"
            ;;
        "Linux")
            os="linux"
            ;;
    esac

    filename="go""$GO_VERSION"."$os""-""$ARCH"".tar.gz"
    if [ ! -f "$filename" ]; then
        wget https://dl.google.com/go/"$filename"
    fi
    sudo tar -C "/usr/local" -xzf "$filename"
    rm $filename
    export PATH="$PATH:/usr/local/go/bin"
    go install winterdrache.de/goformat

    echo "export PATH=\$PATH:/usr/local/go/bin"
}

installYarn() {
    TEST_NODE=$(node -v)
    TEST_YARN=$(yarn -v)

    if [ "$TEST_NODE" != "" ]; then
        echo "Seems like \`node\` is already installed. Skipping..."
        return
    else
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
        nvm install node
    fi

    if [ "$TEST_YARN" != "" ]; then
        echo "Seems like \`yarn\` is already installed. Skipping..."
        return
    else
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
        sudo apt-get update && sudo apt-get install yarn
    fi
}

installNim() {
    TEST_NIM=$(choosenim -h)

    if [ "$TEST_NIM" != "" ]; then
        echo "Seems like \`choosenim\` is already installed. Skipping..."
        return
    fi

    curl https://nim-lang.org/choosenim/init.sh -sSf | sh
}

installPlease() {
    TEST_PLZ=$(plz --version)

    if [ "$TEST_PLZ" != "" ]; then
        echo "Seems like \`plz\` is already installed. Skipping..."
        return
    fi

    curl https://get.please.build | bash
}

installPostgreSQL() {
    TEST_PSQL=$(psql -V)

    if [ "$TEST_PSQL" != "" ]; then
        echo "Seems like \`psql\` is already installed. Skipping..."
        return
    fi

    case $OS in
        "Darwin")
            brew install postgresql
            ;;
        "Linux")
            sudo apt-get update
            sudo apt-get install postgresql-10
            ;;
    esac
}

installShellcheck() {
    TEST_SHELLCHECK=$(shellcheck -V)

    if [ "$TEST_SHELLCHECK" != "" ]; then
        echo "Seems like \`shellcheck\` is already installed. Skipping..."
        return
    fi

    case $OS in
        "Darwin")
            brew install shellcheck
            ;;
        "Linux")
            sudo apt-get update
            sudo apt-get install shellcheck
            ;;
    esac
}

if ! echo "$SUPPORTED_OS" | grep -w "$OS" > /dev/null; then
    echo "Unfortunately this is an unsupported OS."
    exit 1
fi

if [ ${#*} -lt 1 ]; then
    installGo
    installYarn
    installNim
    installPostgreSQL
    installShellcheck
    config
fi

while getopts cghnpqsy opt; do
    case $opt in
        c)
            config
            ;;
        g)
            installGo
            ;;
        h)
            showHelp
            ;;
        n)
            installNim
            ;;
        p)
            installPlease
            ;;
        q)
            installPostgreSQL
            ;;
        s)
            installShellcheck
            ;;
        y)
            installYarn
            ;;
        *)
            "Invalid flag $opt. Use -h to show usage."
    esac
done
