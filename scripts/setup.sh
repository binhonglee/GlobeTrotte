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
  TEST_GOFORMAT=$(goformat -v)

  if [ "$TEST_GO" != "" ]; then
    echo "Seems like \`go\` is already installed. Skipping..."
  else
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
    echo "export PATH=\$PATH:/usr/local/go/bin"
  fi

  if [ "$TEST_GOFORMAT" != "" ]; then
    echo "Seems like \`goformat\` is already installed. Skipping..."
  else
     go get winterdrache.de/goformat/goformat
  fi
}

installNode() {
  TEST_NODE=$(node -v)

  if [ "$TEST_NODE" != "" ]; then
    echo "Seems like \`node\` is already installed. Skipping..."
  else
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
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
}

installPNPM() {
  installNode
  TEST_PNPM=$(pnpm -v)

  if [ "$TEST_PNPM" != "" ]; then
    echo "Seems like \`pnpm\` is already installed. Skipping..."
  else
    curl -L https://unpkg.com/@pnpm/self-installer | node
  fi

  if [ -d "node_modules" ]; then
    echo "Seems like \`node_modules\` already exists. Skipping..."
  else
    pnpm install --shamefully-hoist
  fi
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

installWings() {
  TEST_WINGS=$(wings -v)

  if [ "$TEST_WINGS" != "" ]; then
    echo "Seems like \`wings\` is already installed. Skipping..."
    return
  fi

  mkdir -p "$HOME"/wings/
  sudo curl -L https://github.com/binhonglee/wings/releases/download/v0.0.5-alpha/wings_64bit_linux -o /usr/bin/wings
  sudo chmod +x /usr/bin/wings
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
