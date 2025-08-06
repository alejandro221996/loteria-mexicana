#!/bin/bash

# Script para hacer push creando automáticamente el repositorio remoto si no existe
# Uso: ./smart-push.sh [nombre-del-repo] [público|privado]

REPO_NAME=${1:-$(basename "$(pwd)")}
VISIBILITY=${2:-private}

echo "🚀 Intentando hacer push al repositorio: $REPO_NAME"

# Verificar si ya existe un remote origin
if git remote get-url origin &>/dev/null; then
    echo "✅ Remote origin ya existe, haciendo push normal..."
    git push -u origin $(git branch --show-current)
else
    echo "📦 No existe remote origin, creando repositorio en GitHub..."
    
    # Crear repositorio en GitHub y configurar remote
    if [ "$VISIBILITY" = "public" ]; then
        gh repo create "$REPO_NAME" --public --push --source=.
    else
        gh repo create "$REPO_NAME" --private --push --source=.
    fi
    
    echo "✅ Repositorio creado y código subido exitosamente!"
fi 