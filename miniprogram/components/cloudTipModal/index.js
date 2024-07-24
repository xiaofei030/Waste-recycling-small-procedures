// miniprogram/components/cloudTipModal/index.js
const { isMac } = require('../../envList.js');

Component({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    tipText: isMac ? 'sh ./uploadCloudFunction.sh' : './uploadCloudFunction.bat',
    avatar:'cloud://cloud1-8gyjnoot0293e18d.636c-cloud1-8gyjnoot0293e18d-1327821582/icon/avatar.png',
    nickname:'',
    nicknameError:false,
  },
  properties: {
    showUploadTipProps: Boolean
  },
  observers: {
    showUploadTipProps: function(showUploadTipProps) {
      this.setData({
        showUploadTip: showUploadTipProps
      });
    }
  },
  methods: {
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.setData({
        avatar: avatarUrl
      })
    },
    bindblur(res){
      const value = res.detail.value;
      this.data.nickname = value;
    },
    onInput(e) {
      // console.log("nickname=="+e.detail.value);
      let value = e.detail.value;
      if (value.length>10) {
        value = value.slice(0,10);
        this.setData({
          nickname: e.detail.value,
          nicknameError:true
        });
      }else{
        this.setData({
          nickname: value,
          nicknameError:false
        });
      }
    },
    no(){
      this.setData({
        showUploadTip: false
      });
    },
    yes(){
      const {avatar,nickname} = this.data;
      this.triggerEvent('myevent',{
        avatar,
        nickname
      });
      this.setData({
        showUploadTip: false
      });
    },
    onChangeShowUploadTip() {
      this.setData({
        showUploadTip: !this.data.showUploadTip
      });
    },
    copyShell() {
      wx.setClipboardData({
        data: this.data.tipText,
      });
    },
  }

});
