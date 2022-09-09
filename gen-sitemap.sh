#!/bin/bash
POSITIONAL_ARGS=()
while [[ $# -gt 0 ]]; do
  case $1 in
  -g | --generate)
    GENERATE=true
    shift # past argument
    shift # past value
    ;;
  -u | --update)
    UPDATE=true
    shift # past argument
    shift # past value
    ;;
  -f | --filename)
    FILENAME="$2"
    shift # past argument
    shift # past value
    ;;
  -* | --*)
    echo "Unknown option $1"
    exit 1
    ;;
  *)
    POSITIONAL_ARGS+=("$1") # save positional arg
    shift                   # past argument
    ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

if [ -z $FILENAME ]; then
  FILENAME=sitemap.xml
fi

echo "UPDATE            = ${UPDATE}"
echo "GENERATE          = ${GENERATE}"
echo "FILENAME          = ${FILENAME}"

if [[ -n $1 ]]; then
  echo "Last line of file specified as non-opt/last argument:"
  tail -1 "$1"
fi

appendXml() {
  cd "../public"
  cat <<EOF >>"$FILENAME"
  <url>
    <loc>https://deal-with-finances.com$3</loc>
    <lastmod>$(date +'%F')</lastmod>
    <changefreq>$2</changefreq>
    <priority>$1</priority>
  </url>
EOF
  echo "appending xml code for $3"
  cd "../pages"
}

if [ "$GENERATE" == true ]; then
  cd "public"
  rm "$FILENAME"
  touch "$FILENAME"
  cat <<EOF >>"$FILENAME"
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
EOF
  cd "../pages"
  for FILE in $(find . -name '*tsx'); do
    PATHWOEXT="${FILE/.tsx/""}"
    FORMATTEDPATHNAME="${PATHWOEXT/./""}"

    if [[ "$FILE" == "./404.tsx" || "$FILE" == "./_app.tsx" || "$FILE" == "./_document.tsx" ]]; then
      echo "skipping $FILE as it is not a route"
    elif [[ "$FILE" == *index.tsx && "$FILE" != "./index.tsx" ]]; then
      PATHWOINDEX="${FORMATTEDPATHNAME/"/index"/""}"
      appendXml "0.7" "monthly" "$PATHWOINDEX"
    elif [[ "$FILE" == "./index.tsx" ]]; then
      appendXml "1" "weekly" "/"
    else
      appendXml "0.5" "monthly" "$FORMATTEDPATHNAME"
    fi
  done
  cd "../public"
  echo '</urlset>' >>"$FILENAME"
fi

if [ "$UPDATE" == true ]; then
  sed -i 's|</urlset>||;' "public/$FILENAME"
  cd "pages"
  for FILE in $(find . -name '*tsx'); do
    if [[ "$FILE" == "./404.tsx" || "$FILE" == "./_app.tsx" || "$FILE" == "./_document.tsx" || "$FILE" == "./index.tsx" ]]; then
      echo "skipping ${FILE}"
    elif [[ "$FILE" == *index.tsx && "$FILE" != "./index.tsx" ]]; then
      FILEPATH="${FILE/"/index.tsx"/""}"
      FORMATTEDFILEPATH="${FILEPATH/./""}"

      if [[ ! $(grep -rn "../public/$FILENAME" -e "$FORMATTEDFILEPATH") ]]; then
        echo "$FORMATTEDFILEPATH not found..."
        echo "appending new url to $FORMATTEDFILEPATH"
        appendXml "0.7" "monthly" "$FORMATTEDFILEPATH"
      fi
    else
      FILEWOEXT="${FILE/.tsx/""}"
      FORMATTEDFILENAME="${FILEWOEXT/./""}"

      if [[ ! $(grep -rn "../public/$FILENAME" -e "$FORMATTEDFILENAME") ]]; then
        echo "$FORMATTEDFILENAME not found..."
        echo "appending new url to $FORMATTEDFILENAME"
        appendXml "0.5" "monthly" "$FORMATTEDFILENAME"
      fi
    fi
  done
  echo '</urlset>' >>"../public/$FILENAME"
  sed -i '/^[[:space:]]*$/d' "../public/$FILENAME"
fi
