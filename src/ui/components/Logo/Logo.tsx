import React from 'react'
import { motion } from 'framer-motion'

import * as S from './Logo.styled'

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: '#2DD4BF01',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: '#1fc8e1',
  },
}

const iconSecondary = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: '#fff',
    stroke: '#fff',
  },
}

export function Logo() {
  return (
    <S.Container>
      <motion.svg
        width='164'
        height='44'
        viewBox='0 0 164 44'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{
          overflow: 'visible',
          stroke: '#fff',
          strokeWidth: 1,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        }}
      >
        <motion.path
          d='M50.982 34V17.2153H54.8059L55.1781 19.4826C55.7196 18.6704 56.4302 18.0274 57.3101 17.5537C58.2125 17.0573 59.2502 16.8092 60.4234 16.8092C63.0178 16.8092 64.8564 17.8131 65.9393 19.821C66.5484 18.896 67.3606 18.1628 68.3758 17.6213C69.4136 17.0799 70.5416 16.8092 71.7598 16.8092C73.9481 16.8092 75.6289 17.4634 76.802 18.7719C77.9751 20.0804 78.5617 21.998 78.5617 24.5247V34H74.2301V24.9308C74.2301 23.487 73.9481 22.3815 73.3841 21.6145C72.8427 20.8474 71.9967 20.4639 70.8461 20.4639C69.673 20.4639 68.7255 20.8926 68.0035 21.7498C67.3042 22.6071 66.9545 23.8028 66.9545 25.3369V34H62.623V24.9308C62.623 23.487 62.341 22.3815 61.777 21.6145C61.213 20.8474 60.3444 20.4639 59.1713 20.4639C58.0207 20.4639 57.0845 20.8926 56.3625 21.7498C55.6632 22.6071 55.3135 23.8028 55.3135 25.3369V34H50.982ZM85.7535 34.4061C84.3096 34.4061 83.1252 34.1805 82.2003 33.7292C81.2753 33.2555 80.5872 32.6351 80.136 31.868C79.6848 31.101 79.4592 30.255 79.4592 29.33C79.4592 27.7734 80.0683 26.51 81.2866 25.5399C82.5048 24.5699 84.3322 24.0848 86.7687 24.0848H91.0325V23.6787C91.0325 22.5282 90.7054 21.6822 90.0512 21.1407C89.3969 20.5993 88.5848 20.3286 87.6147 20.3286C86.7349 20.3286 85.9678 20.5429 85.3136 20.9715C84.6593 21.3776 84.2532 21.9867 84.0953 22.7989H79.8653C79.9781 21.5806 80.3842 20.5203 81.0835 19.6179C81.8055 18.7155 82.7304 18.0274 83.8584 17.5537C84.9864 17.0573 86.2498 16.8092 87.6485 16.8092C90.0399 16.8092 91.9237 17.407 93.2998 18.6027C94.676 19.7984 95.3641 21.4904 95.3641 23.6787V34H91.6755L91.2694 31.2928C90.7731 32.1952 90.0737 32.9396 89.1713 33.5262C88.2915 34.1128 87.1522 34.4061 85.7535 34.4061ZM86.7349 31.022C87.9757 31.022 88.9345 30.616 89.6113 29.8038C90.3106 28.9916 90.7505 27.9877 90.931 26.792H87.2425C86.0919 26.792 85.2684 27.0063 84.7721 27.435C84.2758 27.8411 84.0276 28.3487 84.0276 28.9578C84.0276 29.612 84.2758 30.1196 84.7721 30.4806C85.2684 30.8416 85.9227 31.022 86.7349 31.022ZM96.7904 34V17.2153H100.648L101.054 20.3624C101.663 19.2795 102.487 18.4222 103.525 17.7905C104.585 17.1363 105.826 16.8092 107.247 16.8092V21.3776H106.029C105.081 21.3776 104.235 21.5242 103.491 21.8175C102.746 22.1108 102.16 22.6184 101.731 23.3403C101.325 24.0622 101.122 25.0662 101.122 26.3521V34H96.7904ZM107.5 34V9.63507H111.832V24.0171L117.788 17.2153H122.931L116.062 24.8631L124.048 34H118.634L111.832 25.5738V34H107.5ZM130.794 34.4061C129.102 34.4061 127.602 34.0451 126.293 33.3232C124.985 32.6012 123.958 31.586 123.214 30.2776C122.469 28.9691 122.097 27.4575 122.097 25.743C122.097 24.0058 122.458 22.4605 123.18 21.1069C123.924 19.7533 124.94 18.7042 126.225 17.9597C127.534 17.1927 129.068 16.8092 130.828 16.8092C132.475 16.8092 133.93 17.1701 135.193 17.8921C136.456 18.614 137.438 19.6066 138.137 20.87C138.859 22.1108 139.22 23.4982 139.22 25.0323C139.22 25.2805 139.209 25.5399 139.186 25.8107C139.186 26.0814 139.175 26.3634 139.152 26.6567H126.395C126.485 27.9651 126.936 28.9916 127.748 29.7361C128.583 30.4806 129.587 30.8528 130.76 30.8528C131.64 30.8528 132.373 30.6611 132.96 30.2776C133.569 29.8715 134.02 29.3526 134.313 28.7209H138.713C138.397 29.7812 137.866 30.7513 137.122 31.6312C136.4 32.4884 135.498 33.1652 134.415 33.6616C133.354 34.1579 132.148 34.4061 130.794 34.4061ZM130.828 20.3286C129.767 20.3286 128.831 20.6331 128.019 21.2422C127.207 21.8288 126.688 22.7312 126.462 23.9494H134.821C134.753 22.844 134.347 21.9642 133.603 21.3099C132.858 20.6557 131.933 20.3286 130.828 20.3286ZM148.311 34.4061C146.619 34.4061 145.119 34.0451 143.811 33.3232C142.502 32.6012 141.476 31.586 140.731 30.2776C139.987 28.9691 139.615 27.4575 139.615 25.743C139.615 24.0058 139.976 22.4605 140.697 21.1069C141.442 19.7533 142.457 18.7042 143.743 17.9597C145.052 17.1927 146.586 16.8092 148.345 16.8092C149.992 16.8092 151.447 17.1701 152.711 17.8921C153.974 18.614 154.955 19.6066 155.655 20.87C156.377 22.1108 156.738 23.4982 156.738 25.0323C156.738 25.2805 156.726 25.5399 156.704 25.8107C156.704 26.0814 156.693 26.3634 156.67 26.6567H143.912C144.002 27.9651 144.454 28.9916 145.266 29.7361C146.101 30.4806 147.105 30.8528 148.278 30.8528C149.157 30.8528 149.891 30.6611 150.477 30.2776C151.086 29.8715 151.538 29.3526 151.831 28.7209H156.23C155.914 29.7812 155.384 30.7513 154.64 31.6312C153.918 32.4884 153.015 33.1652 151.932 33.6616C150.872 34.1579 149.665 34.4061 148.311 34.4061ZM148.345 20.3286C147.285 20.3286 146.349 20.6331 145.537 21.2422C144.724 21.8288 144.206 22.7312 143.98 23.9494H152.338C152.271 22.844 151.865 21.9642 151.12 21.3099C150.376 20.6557 149.451 20.3286 148.345 20.3286Z'
          fill='#FAFAFA'
          variants={iconSecondary}
          initial='hidden'
          animate='visible'
          transition={{
            default: {
              duration: 2,
              ease: 'easeInOut',
              repeat: false,
              repeatType: 'reverse',
            },
            fill: {
              duration: 2,
              ease: [1, 0, 0.8, 1],
              repeat: false,
            },
          }}
        />
        <motion.path
          d='M159.535 34.2369C158.745 34.2369 158.091 33.9887 157.572 33.4924C157.076 32.996 156.828 32.3982 156.828 31.6988C156.828 30.9769 157.076 30.3678 157.572 29.8715C158.091 29.3752 158.745 29.127 159.535 29.127C160.324 29.127 160.967 29.3752 161.464 29.8715C161.983 30.3678 162.242 30.9769 162.242 31.6988C162.242 32.3982 161.983 32.996 161.464 33.4924C160.967 33.9887 160.324 34.2369 159.535 34.2369Z'
          fill='url(#paint0_linear)'
          variants={icon}
          initial='hidden'
          animate='visible'
          stroke='#1fc8e1'
          transition={{
            default: {
              duration: 2,
              ease: 'easeInOut',
              repeat: false,
            },
            fill: {
              duration: 2,
              ease: [1, 0, 0.8, 1],
              repeat: false,
            },
          }}
        />
        <motion.path
          d='M0 39.9821V14.5029V4.37622C0 3.55665 0.926716 3.08024 1.59323 3.55717L17.3594 14.8389C17.7099 15.0896 18.1811 15.0896 18.5316 14.8389L34.2978 3.55717C34.9643 3.08024 35.8911 3.55665 35.8911 4.37622V39.9371C35.8911 40.8772 34.7171 41.3047 34.1126 40.5847L24.9553 29.6776C24.5811 29.232 23.9083 29.1952 23.4878 29.5973L18.656 34.2182C18.2609 34.596 17.6364 34.5897 17.2491 34.2038L12.6482 29.6205C12.2332 29.2071 11.5543 29.2337 11.1729 29.6783L1.77157 40.6378C1.1629 41.3474 0 40.9169 0 39.9821Z'
          fill='url(#paint1_linear)'
          variants={icon}
          initial='hidden'
          animate='visible'
          stroke='#1fc8e1'
          transition={{
            default: {
              duration: 3,
              ease: 'easeInOut',
              repeat: false,
            },
            fill: {
              duration: 3,
              ease: [1, 0, 0.8, 1],
              repeat: false,
            },
          }}
        />
      </motion.svg>
    </S.Container>
  )
}
