import { Cookies, Notify, openURL } from 'quasar'

if (Cookies.has('gdpr') !== true) {
  const policyUrl = 'https://www.iubenda.com/privacy-policy/40685560/cookie-policy?an=no&s_ck=false&newmarkup=yes'

  Notify.create({
    // message: 'Our third-party tools use cookies, which are necessary for its functioning' +
    //  ' and required to achieve the purposes illustrated in the cookie policy.',
    message: '我们的第三方工具使用cookie，这是其功能所必需的，也是实现cookie策略中所述目的所必需的。',
    multiline: true,
    classes: 'doc-gdpr',
    timeout: 0,
    position: 'bottom-right',
    actions: [
      {
        label: '同意',
        color: 'yellow',
        handler () {
          Cookies.set('gdpr', true, { expires: 5 * 365 })
        }
      },
      {
        label: 'Learn more',
        color: 'grey',
        noDismiss: true,
        handler () {
          openURL(policyUrl)
        }
      }
    ]
  })
}
