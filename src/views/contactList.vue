<template>
  <div>
    <!--联系人列表-->
    <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
    />
    <!--联系人编辑-->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
  import {ContactList, Toast, ContactEdit, Popup} from 'vant'
  import axios from 'axios'

  export default {
    name: "contactList",
    components: {
      [ContactList.name]: ContactList,
      [ContactEdit.name]: ContactEdit,
      [Popup.name]: Popup
    },
    data() {
      return {
        chosenContactId: '',
        editingContact: {},//正在编辑的联系人
        isEdit: false,//false新建，true编辑
        showEdit: false, //弹窗显示隐藏
        list: [
          // {
          //   id: 1,
          //   name: '',
          //   tel: ''
          // }
        ],
        instance: null //axios 实例
      }
    },
    created() {
      this.instance = axios.create({
        baseURL: 'http://localhost:9000/api',
        timeout: 1000
      })
      this.getContact()
    },
    methods: {
      // getContact() {
      //   this.instance.get('/contactList').then(res => {
      //     if (res.data.code === 200) {
      //       this.list = res.data.data
      //     }
      //   }).catch(err => {
      //     Toast('报错啦~');
      //     console.log(err)
      //   })
      // },
      async getContact() {
        let res = await this.$http.getContactList()
        this.list = res.data
      },
      onAdd() {
        this.showEdit = true
        this.isEdit = false
      },
      onEdit(index) {
        this.editingContact = index;
        this.isEdit = true
        this.showEdit = true
      },
      onSelect() {

      },
      onSave(info) {
        if (this.isEdit) {
          this.instance.put('contact/edit', info).then(res => {
            console.log(res, 'edit')
            this.getContact()

          })
        } else {
          //  新建
          this.instance.post('contact/new/json', info).then(res => {
            console.log(res, 'new')
            Toast('新建成功')
            this.getContact()
            this.showEdit = false
          }).catch(err => {
            Toast('error', err)
          })
        }

      },
      onDelete(info) {
        this.instance.delete('/contact', {
          params: {
            id: info.id,
            headers: {}
          }
        }).then(res => {
          this.getContact()
          this.showEdit = false
          console.log(res, 'delete')
        })
        this.list.splice(info.id, 1)
      }
    }
  }
</script>

<style scoped>

</style>
