const z = require('zod')

const baseSchema = z.object({})

const extendedSchema = baseSchema.extend({
  a: z.string()
})

const optionsSchema = baseSchema.or(extendedSchema)

const options = {
  a: 'A'
}

console.log('before `schema.parse`', JSON.stringify(options))      // prints: before `schema.parse` {"a":"A"}
const validOptions = optionsSchema.parse(options)
console.log('-after `schema.parse`', JSON.stringify(validOptions)) // prints: -after `schema.parse` {}
