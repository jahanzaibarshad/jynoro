const fs = require('fs/promises')
const path = require('path')

const targetDirs = ['app', 'components', 'lib', 'content', 'data']
const targetExts = ['.ts', '.tsx', '.js', '.json', '.mdx']

async function *walk(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true })
    for (const file of files) {
      const res = path.resolve(dir, file.name)
      if (file.isDirectory()) {
        yield* walk(res)
      } else {
        yield res
      }
    }
  } catch (err) {
    // Ignore missing directories
  }
}

async function updateReferences() {
  let updatedFiles = 0

  for (const dir of targetDirs) {
    const fullPath = path.join(process.cwd(), dir)
    for await (const filepath of walk(fullPath)) {
      const ext = path.extname(filepath).toLowerCase()
      if (targetExts.includes(ext)) {
        const content = await fs.readFile(filepath, 'utf-8')
        
        // Regex to replace .png, .jpg, .jpeg with .webp in strings
        const updatedContent = content.replace(/\.(png|jpg|jpeg)(["'\`\)])/gi, '.webp$2')
        
        if (content !== updatedContent) {
          await fs.writeFile(filepath, updatedContent, 'utf-8')
          console.log(`Updated: ${filepath}`)
          updatedFiles++
        }
      }
    }
  }
  
  console.log(`\nDone! Updated references in ${updatedFiles} files.`)
}

updateReferences()
