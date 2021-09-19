import React, { ImgHTMLAttributes } from 'react'

import { LOGO } from 'assets'

import * as S from './Logo.styled'

type Props = ImgHTMLAttributes<HTMLImageElement>

export function Logo(props: Props) {
  return <S.Container src={LOGO} alt='Markee App' {...props} />
}
