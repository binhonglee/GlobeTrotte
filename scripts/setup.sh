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
    -m node (and pnpm)
    -n nim
    -p Please
    -q PostgreSQL
    -s shellcheck

    -h Display this menu

Note: You will need to have all the requirements installed for the
    program to run properly.

EOF
}

config() {
    CURRENT=$(pwd | awk -F'/' '{print $NF}')

    if [ "$CURRENT" != "GlobeTrotte" ]; then
        echo "Invalid location. Config file not set up."
        echo "Please run this script again (with -c option) from the top level folder of the project."
        return
    fi

    if [ -e "config/psql.config" ]; then
        echo "Seems like \`psql.config\` file already exist. Skipping..."
        return
    fi

    cp config/sample.config config/psql.config
    echo "Please fill in the information in psql.config file."
}

installGo() {
    TEST_GO=$(go version)

    if [ "$TEST_GO" != "" ]; then
        echo "Seems like \`go\` is already installed. Skipping..."
        return
    fi

    GO_VERSION="1.12.6"

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

    tar -C "/usr/local" -xzf "go""$GO_VERSION"."$os""-""$ARCH"".tar.gz"
    export PATH=$PATH:/usr/local/go/bin
    go get github.com/mbenkmann/goformat/goformat

    echo "export PATH=\$PATH:/usr/local/go/bin"
}

installPNPM() {
    TEST_NODE=$(node -v)
    TEST_PNPM=$(pnpm -v)

    if [ "$TEST_NODE" != "" ]; then
        echo "Seems like \`node\` is already installed. Skipping..."
        return
    else
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
        nvm install node
    fi

    if [ "$TEST_PNPM" != "" ]; then
        echo "Seems like \`pnpm\` is already installed. Skipping..."
        return
    else
        curl -L https://unpkg.com/@pnpm/self-installer | node
    fi
}

installNim() {
    TEST_NIM=$(nim)

    if [ "$TEST_NIM" != "" ]; then
        echo "Seems like \`nim\` is already installed. Skipping..."
        return
    fi

    case $OS in
        "Darwin")
            brew install nim
            ;;
        "Linux")
            sudo apt-get install nim
            ;;
    esac
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
    installPNPM
    installNim
    installPostgreSQL
    installShellcheck
    config
fi

while getopts cghnpqs opt; do
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
        m)
            installPNPM
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
    esac
done
