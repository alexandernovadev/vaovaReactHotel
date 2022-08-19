import React from 'react'
import { useTranslation } from 'react-i18next'

import logo from "../assets/logo-vaova-white-1.png"
import { LoadingViewContent } from './styles/LoadingView'


export const LoadingViews = () => {
  const  {t} = useTranslation()

  return (
    <LoadingViewContent>
      <div className='animate__animated animate__flash animate__infinite '>
        <img src={logo} alt="Logo vaova" />
        <h1>{t("COMMON.LOADING")}</h1>
      </div>
    </LoadingViewContent>
  )
}
