#!/usr/bin/env bash

set -eou pipefail

cat <<EOF > .git/hooks/pre-commit
#!/usr/bin/env bash
yarn lint:fix
yarn prettier:fix
EOF

chmod +x .git/hooks/pre-commit

echo "Pre-commit hook created"
