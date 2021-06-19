#!/bin/sh

ARCH=$(uname -m)
OS=$(uname -s)
SUPPORTED_OS="Darwin Linux"

toPrint=""

showHelp() {
  cat << EOF

Specific options to install only specific requirement.
  [default / no option] install all of below

  -c config
  -g Go
  -n node (and pnpm)
  -p Please
  -q PostgreSQL
  -s shellcheck
  -w wings

  -h Display this menu

Note: You will need to have all the requirements installed for the
  program to run properly.

EOF
}

printEnd() {
  toPrint="$toPrint\n$1"
}

config() {
  PSQL_CONFIG_FILE="config/psql.config"
  EMAIL_CONFIG_FILE="config/email.config"

  if [ ! -d "config" ]; then
    echo "'config' directory not found."
    echo "Make sure you are running this script (with -c option) from the top level folder of the project."
    return
  fi

  if [ -e "$PSQL_CONFIG_FILE" ]; then
    echo "Seems like \`$PSQL_CONFIG_FILE\` file already exist. Skipping..."
  else
    echo "Setting up databases..."
    case $OS in
      "Darwin")
        psql postgres -w -c "CREATE DATABASE globetrotte;"
        psql postgres -w -c "CREATE ROLE $USER WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'test';"
        psql postgres -w -c "GRANT ALL PRIVILEGES ON DATABASE globetrotte TO $USER;"
        ;;
      "Linux")
        sudo -u postgres psql -w -c "CREATE DATABASE globetrotte;"
        sudo -u postgres psql -w -c "CREATE ROLE $USER WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'test';"
        sudo -u postgres psql -w -c "GRANT ALL PRIVILEGES ON DATABASE globetrotte TO $USER;"
        ;;
    esac

    echo "Creating psql config file..."
    touch "$PSQL_CONFIG_FILE"
    {
      echo "host:localhost"
      echo "port:5432"
      echo "user:$USER"
      echo "password:test"
      echo "dbname:globetrotte"
    } >> "$PSQL_CONFIG_FILE"
  fi

  if [ -e "$EMAIL_CONFIG_FILE" ]; then
    echo "Seems like \`$EMAIL_CONFIG_FILE\` file already exist. Skipping..."
  else
    echo "Creating email config file..."
    touch "$EMAIL_CONFIG_FILE"
  fi
}

installGo() {
  TEST_GO=$(go version)

  if [ "$TEST_GO" != "" ]; then
    echo "Seems like \`go\` is already installed. Skipping..."
  else
    GO_VERSION="1.15.8"

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

    GO_OS=$(echo "$OS" | awk '{print tolower($0)}')

    filename="go""$GO_VERSION"."$GO_OS""-""$ARCH"".tar.gz"
    if [ ! -f "$filename" ]; then
      curl -L https://dl.google.com/go/"$filename" -o "$filename"
    fi
    sudo tar -C "/usr/local" -xzf "$filename"
    rm "$filename"
    export GOPATH="$HOME/go"
    export PATH="$PATH:/usr/local/go/bin:$GOPATH/bin"
    printEnd "Add the following lines to your .bashrc / .zshrc file:"
    printEnd "  export GOPATH=\"\$HOME/go\""
    printEnd "  export PATH=\$PATH:/usr/local/go/bin:\$GOPATH/bin"
  fi

  go mod download
}

installNode() {
  TEST_NODE=$(node -v)

  if [ "$TEST_NODE" != "" ]; then
    echo "Seems like \`node\` is already installed. Skipping..."
  else
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    nvm install node
  fi
}

installPlease() {
  TEST_PLZ=$(plz --version)

  if [ "$TEST_PLZ" != "" ]; then
    echo "Seems like \`plz\` is already installed. Skipping..."
    return
  fi

  curl https://get.please.build | bash
  ./pleasew update
}

installPNPM() {
  installNode
  TEST_PNPM=$(pnpm -v)

  if [ "$TEST_PNPM" != "" ]; then
    echo "Seems like \`pnpm\` is already installed. Skipping..."
  else
    curl -L https://pnpm.js.org/pnpm.js | node - add --global pnpm
  fi

  if [ -d "node_modules" ]; then
    echo "Seems like \`node_modules\` already exists. Skipping..."
  else
    pnpm install
  fi
}

installPostgreSQL() {
  TEST_PSQL=$(psql -V)

  if [ "$TEST_PSQL" = "" ]; then
    case $OS in
      "Darwin")
        brew install postgresql
        ;;
      "Linux")
        sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
        wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
        sudo apt-get update
        sudo apt-get -y install postgresql
        ;;
    esac
  else 
    echo "Seems like \`psql\` is already installed. Skip installing..."
  fi

  echo "Starting postgres service..."
  case $OS in
    "Darwin")
      brew services start postgresql
      ;;
    "Linux")
      sudo service postgresql start
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

installWings() {
  TEST_WINGS=$(wings -v)

  if [ "$TEST_WINGS" != "" ]; then
    echo "Seems like \`wings\` is already installed. Skipping..."
    return
  fi
  
  curl -s https://wings.sh/install.sh | sh
}

if ! echo "$SUPPORTED_OS" | grep -w "$OS" > /dev/null; then
  echo "Unfortunately this is an unsupported OS."
  exit 1
fi

if [ ${#*} -lt 1 ]; then
  installGo
  installPlease
  installPNPM
  installPostgreSQL
  installShellcheck
  installWings
  config
fi

while getopts cghnpqsw opt; do
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
      installPNPM
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
    w)
      installWings
      ;;
    *)
      "Invalid flag $opt. Use -h to show usage."
  esac
done

echo "$toPrint"
