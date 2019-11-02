const CONTACT_API = {
  getContactList: {
    //获取联系人列表
    method: 'get',
    url: '/contactList'
  },
//  新建联系人
  newContactForm: {
    method: 'post',
    url: '/contact/new/form'
  },
  //编辑
  editContact: {
    method: 'put',
    url: '/contact/edit'
  },
  //删除
  DeleteContact: {
    method: 'delete',
    url: '/contact'
  }
}
export default CONTACT_API
