import * as t from 'io-ts'

export const archiveCodec = t.type({
  id: t.string,
  title: t.string,
  content: t.string,
  active: t.boolean,
  status: t.union([
    t.literal('editing'),
    t.literal('saved'),
    t.literal('saving'),
  ]),
})

export type Archive = t.TypeOf<typeof archiveCodec>
