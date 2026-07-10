const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

async function *walk(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  for (const file of files) {
    const res = path.resolve(dir, file.name)
    if (file.isDirectory()) {
      yield* walk(res)
    } else {
      yield res
    }
  }
}

async function convertToWebP() {
  const publicDir = path.join(process.cwd(), 'public')
  console.log('Scanning:', publicDir)

  let convertedCount = 0
  let errorCount = 0

  for await (const filepath of walk(publicDir)) {
    const ext = path.extname(filepath).toLowerCase()
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const parsedPath = path.parse(filepath)
      const webpPath = path.join(parsedPath.dir, parsedPath.name + '.webp')
      
      try {
        console.log(`Converting: ${filepath}`)
        await sharp(filepath)
          .webp({ quality: 85 })
          .toFile(webpPath)
        
        // Delete original file
        await fs.unlink(filepath)
        console.log(`✓ Created: ${webpPath}`)
        convertedCount++
      } catch (err) {
        console.error(`✗ Error converting ${filepath}:`, err)
        errorCount++
      }
    }
  }

  console.log(`\nDone! Converted ${convertedCount} images to WebP. Errors: ${errorCount}`)
}

convertToWebP()
