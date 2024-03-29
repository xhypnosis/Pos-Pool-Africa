import {createPortal} from 'react-dom'
// import {Link} from 'react-router-dom' hypnos
// import { Layout, Button, Select } from 'antd' hypnos
import {Layout, Button} from 'antd'
import {Menu, Dropdown, Alert, Modal} from 'antd' // hypnos 23/02/16
import {useTranslation} from 'react-i18next'
import {useTryActivate, useAccount} from '../../../hooks/useWallet'
import {isTestNetEnv} from '../../../utils'
import NotAllow from '../../../images/not-allow.png'
import i18n from '../../../../public/locales'
import './index.css' //hypnos
import global from '../../../images/global.svg' //hypnos
import lang from '../../../images/lang.svg' //hypnos
import {useState} from 'react' //hypnos
import {Tag} from 'antd' //hypnos
import useCurrentSpace from '../../../hooks/useCurrentSpace'
import useCurrentNetwork from '../../../hooks/useCurrentNetwork'
import useIsNetworkMatch from '../../../hooks/useIsNetworkMatch'

import {useNavigate} from 'react-router-dom' //hypnos

// const { Option } = Select hypnos
const {Header} = Layout
const isTest = isTestNetEnv()

function HeaderComp() {
  const {t} = useTranslation()
  const address = useAccount()
  const tryActivate = useTryActivate()
  const isNetworkMatch = useIsNetworkMatch()
  const networkError = !isNetworkMatch
  const currentSpace = useCurrentSpace()
  const currentNetwork = useCurrentNetwork()

  // hypnos+s
  const [hover, setHover] = useState(false)

  // hypnos+3c 23/02/16
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // hypnos+f
  function ellipsisAddr(addr) {
    let result
    if (addr.length > 16) {
      let left = addr.substring(0, 12)
      let ellipsis = '...'
      let rightIndex = addr.length - 4
      let right = addr.substring(rightIndex)
      result = left + ellipsis + right
    }
    return result
  }

  // hypnos+l
  let navigate = useNavigate()
  // hypnos+c
  const onClickNet = ({key}) => {
    navigate(key)
  }
  // hypnos+n
  const networks = (
    <Menu
      onClick={onClickNet}
      items={[
        {
          label: 'Conflux Core',
          key: '/pool/core/0x81388b499a6f76f47c78c35807c8d1ab4efa019a',
        },
        {
          label: 'Conflux eSpace',
          key: '/pool/e-space/0x4395486B5DD6AD3aBc1535aF29d3F7e56d9E4CcF?coreAddress=0x81388b499a6f76f47c78c35807c8d1ab4efa019a',
        },
      ]}
    />
  )

  // hypnos+c
  const onClickLang = ({key}) => {
    i18n.changeLanguage(key)
  }
  // hypnos+l
  const langs = (
    <Menu
      onClick={onClickLang}
      items={[
        {
          label: 'English',
          key: 'en',
        },
      ]}
    />
  )

  return (
    // <Header style={{ width: '100%', height: 'fit-content', padding: 0 }}>
    // hypnos
    <Header
      style={{
        width: '100%',
        height: 'fit-content',
        padding: 0,
        backgroundColor: 'transparent',
      }}
    >
      {/* hypnos+m 23/02/16 */}
      <Modal
        title="Important Notice"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Staking Africa will be closed on March 8th at 10 AM (UTC). Staking and
          interest generation will be stopped on February 22nd at 10 AM (UTC).
          Staked amounts will be returned on March 8th if they have not been
          unstaked.
        </p>
      </Modal>
      {/* hypnos+a 23/02/16 */}
      <div className="w-full h-20">
        <div className="position: fixed z-50 top-0">
          <Alert
            message="Important Notice: Staking Africa will be closed on March 8th at 10 AM (UTC). Staking and
            interest generation will be stopped on February 22nd at 10 AM (UTC).
            Staked amounts will be returned on March 8th if they have not been
            unstaked."
            type="warning"
            showIcon
          />
        </div>
      </div>
      {isTest && (
        <div className="w-full h-[64px] leading-[64px] text-[#f3504f] bg-[#f3504f] bg-opacity-20 z-[49] text-[16px] text-center border-b border-[#f3504f]">
          {t('Header.test_note')}
        </div>
      )}
      {/* hypnos */}
      {/* <div className="flex justify-between text-white bg-main-back bg-opacity-0 px-[50px]"> */}
      {/* hypnos */}
      <div className="flex justify-between text-white bg-white bg-opacity-70 font-body">
        {/* <div>
                    <Link
                        to="/pool-manage"
                    >
                        {t('Header.pos_pool')}
                    </Link>
                </div> */}
        {/* hypnos */}
        {/* hypnos+d */}
        <div
          className="w-[1200px] flex justify-between h-[72px] flex-wrap"
          style={{margin: '0 auto'}}
        >
          <div className="w-[600px]">
            <p className="title">Staking Africa</p>
          </div>
          {/* <div className="flex items-center"> hypnos */}
          <div className="flex items-center w-[600px] flex-row-reverse h-[72px]">
            {/* hypnos+d */}
            <Dropdown
              overlay={langs}
              placement="bottom"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div className="w-[50px] h-[50px] ml-6 flex items-center justify-center">
                {!hover && <img src={global} alt="" />}
                {hover && <img src={lang} alt="" />}
              </div>
            </Dropdown>
            {currentSpace && address && (
              <Tag
                className="w-[245px] text-center"
                style={{backgroundColor: '#546FFF'}}
              >
                <ul className="font-medium text-base my-[9px]">
                  <li
                    style={{
                      color: '#44D7B6',
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >
                    <span style={{color: 'white', marginLeft: '-5px'}}>
                      {ellipsisAddr(address)}
                    </span>
                  </li>
                </ul>
              </Tag>
            )}
            {currentSpace && !address && (
              <Button
                className="mr-4 w-[245px]"
                style={{
                  border: '1px solid #546FFF',
                  color: '#546FFF',
                  height: 40,
                }}
                onClick={tryActivate}
              >
                {t(
                  currentSpace === 'core'
                    ? 'Header.connect_fluent'
                    : 'Header.connect_metamask',
                )}
              </Button>
            )}
            {/* hypnos+d */}
            <Dropdown overlay={networks} placement="bottom">
              <Button
                className="mr-4 w-[150px]"
                style={{
                  border: '1px solid #546FFF',
                  color: '#546FFF',
                  height: 40,
                }}
              >
                Switch Network
              </Button>
            </Dropdown>
            {/* <Select
                        style={{ marginRight: '20px' }}
                        defaultValue={i18n.language}
                        onChange={lng => i18n.changeLanguage(lng)}
                    >
                        <Option value="en">English</Option>
                        <Option value="vn">Vietnamese</Option>
                        <Option value="id">Indonesian</Option>
                        <Option value="ko">Korean</Option>
                        <Option value="zh">中文</Option>
                    </Select> */}
            {/* {currentSpace && address && <div>{address}</div>}
                    {currentSpace && !address && (
                        <Button type="primary" onClick={tryActivate}>
                            {t(currentSpace === 'core' ? 'Header.connect_fluent' : 'Header.connect_metamask')}
                        </Button>
                    )} hypnos */}
          </div>
        </div>
      </div>

      {networkError &&
        createPortal(
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-25 z-50">
            <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center w-[480px] h-[390px] px-[28px] py-[12px] bg-white shadow rounded-md">
              <img
                className="w-[340px] h-[240px]"
                src={NotAllow}
                alt="not allow imgs"
              />
              <p className="text-[32px] leading-[32px] text-[#333] my-[16px] font-bold">
                {t('Header.error')}
              </p>
              <p className="text-[16px] leading-[24px] text-[#999] my-0 font-medium">
                {t('Header.unspport_network_switch', {
                  network: currentNetwork?.name || '',
                })}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </Header>
  )
}

export default HeaderComp
