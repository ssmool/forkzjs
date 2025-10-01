#!/usr/bin/env bash

echo "Select output format:"
echo "1) JSON"
echo "2) CSV"
echo "3) XML"
echo "4) RSS"
read -p "Enter choice (1-4): " choice

case $choice in
  1) ext="json" ;;
  2) ext="csv" ;;
  3) ext="xml" ;;
  4) ext="rss" ;;
  *) echo "Invalid choice"; exit 1 ;;
esac

read -p "Enter field names, separated by commas (e.g. name,age,city): " fields

# convert comma-separated into array
IFS=',' read -ra arr <<< "$fields"

outfile="output.$ext"
echo "Generating $outfile …"

# number of records to generate
read -p "How many records to generate? " count
re='^[0-9]+$'
if ! [[ $count =~ $re ]]; then
  echo "Not a number"; exit 1
fi

# define sample words list
words=("Alice" "Bob" "Carol" "Dave" "Eve" "Foo" "Bar" "Baz" "Qux")

generate_record_json() {
  echo "{"
  local first=1
  for f in "${arr[@]}"; do
    # pick random word
    w=${words[$RANDOM % ${#words[@]} ]}
    if [ $first -eq 1 ]; then
      first=0
    else
      echo ","
    fi
    printf "  \"%s\": \"%s\"" "$f" "$w"
  done
  echo
  echo "}"
}

generate_record_csv() {
  local first=1
  for f in "${arr[@]}"; do
    if [ $first -eq 1 ]; then
      first=0
    else
      printf ","
    fi
    w=${words[$RANDOM % ${#words[@]} ]}
    printf "\"%s\"" "$w"
  done
}

generate_record_xml() {
  echo "  <record>"
  for f in "${arr[@]}"; do
    w=${words[$RANDOM % ${#words[@]} ]}
    echo "    <$f>$w</$f>"
  done
  echo "  </record>"
}

generate_rss_header() {
  echo "<?xml version=\"1.0\"?>"
  echo "<rss version=\"2.0\"><channel>"
  echo "<title>Generated RSS</title>"
}

generate_rss_footer() {
  echo "</channel></rss>"
}

# Now generate file
case $choice in
  1)
    echo "[" > "$outfile"
    for ((i=0; i<count; i++)); do
      generate_record_json >> "$outfile"
      if [ $i -lt $((count-1)) ]; then
        echo "," >> "$outfile"
      fi
    done
    echo "]" >> "$outfile"
    ;;
  2)
    # CSV: header
    (IFS=','; echo "${arr[*]}") > "$outfile"
    for ((i=0; i<count; i++)); do
      generate_record_csv >> "$outfile"
      echo >> "$outfile"
    done
    ;;
  3)
    echo "<?xml version=\"1.0\"?>" > "$outfile"
    echo "<records>" >> "$outfile"
    for ((i=0; i<count; i++)); do
      generate_record_xml >> "$outfile"
    done
    echo "</records>" >> "$outfile"
    ;;
  4)
    generate_rss_header > "$outfile"
    for ((i=0; i<count; i++)); do
      echo "  <item>" >> "$outfile"
      for f in "${arr[@]}"; do
        w=${words[$RANDOM % ${#words[@]} ]}
        echo "    <$f>$w</$f>" >> "$outfile"
      done
      echo "  </item>" >> "$outfile"
    done
    generate_rss_footer >> "$outfile"
    ;;
esac

echo "Done. Output in $outfile"

