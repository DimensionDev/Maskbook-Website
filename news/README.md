## Add Entry

### Step 1: Metadata

Add one more line in `list.json` to record the metadata of the entry.

Notice that the index must be consecutively incremental and the type must be `news`, `host`, `guest`, or `link`.

The `date` field must follow the given format.

Remember that only non-ending items in an array are followed by a comma.

### Step 2: Content

Create corresponding file in at `/db/{index}.md`, if it is not a link.

Use generic markdown.

### Step 3: Compile

run `node compile.js` to compile.

### Step 4: Publish

run `git add .; git commit -m "_WRITE_YOUR_SUMMARY_HERE_"; git push origin master;` to publish.
