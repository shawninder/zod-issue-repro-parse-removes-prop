const z = require('zod')

const baseSchema = z.object({
  _: z.string()
})

const aSchema = baseSchema.extend({
  a: z.string()
})

const bSchema = baseSchema.extend({
  b: z.string()
})

const _ab = baseSchema.or(aSchema).or(bSchema) // 0/2
const _ba = baseSchema.or(bSchema).or(aSchema) // 0/2
const a_b = aSchema.or(baseSchema).or(bSchema) // 1/2
const b_a = bSchema.or(baseSchema).or(aSchema) // 1/2
const ab_ = aSchema.or(bSchema).or(baseSchema) // 2/2
const ba_ = bSchema.or(aSchema).or(baseSchema) // 2/2


const options_A = {
  _: '_',
  a: 'A'
}
const options_B = {
  _: '_',
  b: 'B'
}
console.table([{
  schema: 'expected',
  a: JSON.stringify(options_A),                         // {"_":"_","a":"A"} => EXPECTED
  b: JSON.stringify(options_B)                          // {"_":"_","b":"B"} => EXPECTED
}, {
  schema: '_ab',
  a: JSON.stringify(_ab.parse(options_A)),  // {"_":"_"}         => FAIL
  b: JSON.stringify(_ab.parse(options_B))   // {"_":"_"}         => FAIL
},
{
  schema: '_ba',
  a: JSON.stringify(_ba.parse(options_A)),  // {"_":"_"}         => FAIL
  b: JSON.stringify(_ba.parse(options_B))   // {"_":"_"}         => FAIL
},
{
  schema: 'a_b',
  a: JSON.stringify(a_b.parse(options_A)),  // {"_":"_","a":"A"} => SUCCESS
  b: JSON.stringify(a_b.parse(options_B))   // {"_":"_"}         => FAIL
},
{
  schema: 'b_a',
  a: JSON.stringify(b_a.parse(options_A)),  // {"_":"_"}         => FAIL
  b: JSON.stringify(b_a.parse(options_B))   // {"_":"_","b":"B"} => SUCCESS
},
{
  schema: 'ab_',
  a: JSON.stringify(ab_.parse(options_A)),  // {"_":"_","a":"A"} => SUCCESS
  b: JSON.stringify(ab_.parse(options_B))   // {"_":"_","b":"B"} => SUCCESS
},
{
  schema: 'ba_',
  a: JSON.stringify(ba_.parse(options_A)),  // {"_":"_","a":"A"} => SUCCESS
  b: JSON.stringify(ba_.parse(options_B))   // {"_":"_","b":"B"} => SUCCESS
}])
