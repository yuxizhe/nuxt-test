<template>
  <div id='product-info' :class='product ? (product.product_sku_list.length === 1 ? "one-sku": "") : ""'>
    <div v-if='product'>
      <section class="header">
        <h1>
          {{product.product_name}}
        </h1>
        <p>
          {{product.h5_data.introduction}}
        </p>
        <ul class="infobox">
          <li class="age">
            <div class='name'>适用人群</div>
            <div class='value'>{{product.h5_data.fit_person}}</div>
          </li>
          <li class="duration">
            <div class='name'>保障期限</div>
            <div class='value'>{{durationRange}}</div>
          </li>
          <li class="amount">
            <div class='name'>保障额度</div>
            <div class='value'>{{product.h5_data.insurance_amount_memo}}</div>
          </li>
        </ul>
        <div class='company'>
          <p><img src='../../assets/shield@3x.png'>由{{product.h5_data.brand.name}}承保并负责理赔</p>
          <img :src='product.h5_data.company_pic_url'>
        </div>
      </section>
      <section class="info">
        <h2>保险类型和保费</h2>
        <a class='term-link' @click='xqPush' :href='`#/terms?inform=${product.h5_data.inform_url}&terms=${product.h5_data.terms_url}`'>保险条款 <img src='../../assets/arrow@3x.png' style='width: 12px;vertical-align: text-top;margin-top: 1px;'></a>
        <ul class='sku-list'>
          <li v-for='amount in Object.keys(skusGroupByAmount)' @click='selectedAmount=amount' :class='amount.toString() === selectedAmount.toString() ? "active": ""'>
            <div>{{versionByAmount(amount)('tag')}}</div>
            <div>{{skusGroupByAmount[amount].minPremium}}元起</div>
          </li>
        </ul>
        <ul class='sku-desc' v-for='amount in Object.keys(skusGroupByAmount)' v-if='amount.toString() === selectedAmount.toString()'>
          <li v-for='duty in versionByAmount(amount)("duty")'>
            <div class="left">
              <div class="main-desc">
                {{duty.duty}}
              </div>
              <div class="second-desc">
                {{duty.dutydesc}}
              </div>
            </div>
            <div class="right">
              {{duty.coverage}}
            </div>
          </li>
          <li class='price-test'>
            <div class="left">{{skusGroupByAmount[selectedAmount].minPremium}}元起</div>
            <div class="right" @click='showFeeSheet=true'>保费试算 <img src='../../assets/arrow@3x.png' style='width: 12px;vertical-align: text-top;margin-top: 1px;'></div>
          </li>
        </ul>
      </section>
      <ul id='tab'>
        <li data-tab='product-desc' class='active' @click='clickTab("product-desc")'>产品优势</li>
        <li data-tab='lipei' @click='clickTab("lipei")'>理赔流程</li>
        <li data-tab='qa' @click='clickTab("qa")'>常见问题</li>
        <li data-tab='case' @click='clickTab("case")' v-if='product.product_id === "100879" || product.product_id === "100131"'>保险案例</li>
      </ul>
      <section id='product-desc'>
        <h2>产品优势</h2>
        <img v-for='pic in product.h5_data.advance_pic_url' v-if='pic.ys' v-lazy='pic.ys'>
      </section>
      <!-- 平安健康海外就医保使用特殊的理赔流程图 -->
      <section id='lipei' v-if='product.product_id==="100816"'>
        <img src="http://sslstatic.xiaoyusan.com/h5/img/insurance/claims_204338_h5.jpg" style='width:100%'>
      </section>
      <section id='lipei' v-else>
        <h2>理赔流程</h2>
        <ul>
          <li><img src="../../assets/bao@3x.png">拨打保险公司电话 <a :href='"tel:"+phone[product.h5_data.brand.id]' style="color:#FF7F47">{{phone[product.h5_data.brand.id]}}</a></li>
          <li><img src="../../assets/bei@3x.png">在保险公司理赔员的指引下准备材料</li>
          <li><img src="../../assets/song@3x.png">将备齐的材料通过网络上传或邮寄到保险公司</li>
          <li><img src="../../assets/shen@3x.png">等待保险公司审核</li>
          <li><img src="../../assets/shou@3x.png">收取赔款</li>
        </ul>
      </section>
      <section id="qa">
        <h2>常见问题</h2>
        <ul>
          <li v-for='item in product.h5_data.qa'>
            <div class="question">
              <img src='../../assets/icon_question.png' width='24px' height='24px'>
              <p>
                {{item.comment}}                
              </p>
            </div>
            <div class="answer">
              <img src='../../assets/icon_answer.png' width='24px' height='24px'>
              <p v-html='item.reply'>                
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section id="case" v-if='product.product_id === "100879" || product.product_id === "100131"'>
        <h2>保险案例</h2>
        <img src="https://xqimg.imedao.com/15bd68a93c9deb3fdb33d1af.png" style='width:100%'>
        <p>32岁的赵先生是一位公司白领，刚买房，准备组建小家庭。虽然公司已为他缴纳社保，但赵先生还是担心，万一得了大病，很多费用社保都不报销。所以，赵先生花了<b>392</b>元为自己投保了平安e生保（2017版），每年一般医疗保额100万元，恶性肿瘤医疗保额100万元。</p>
        <p>半年后，赵先生参加一次野外活动时，意外摔伤，导致腿部骨折。为尽快康复，他采用了安全性高、副作用小的进口药和进口器材等治疗手段，共花费11万，其中社保个人帐户支出1万、社保统筹帐户报销2万，自付了现金8万。</p>
        <p>赵先生后续申请理赔，我们的赔付金额=<b>11万 - 社保统筹赔付2万 - 免赔额1万 = 8万元</b></p>
        <p>倘若赵先生就诊时，首先没有使用社保，赵先生现金支付全部医疗费用11万，那么我们的<b>赔付金额= （11万 - 免赔额1万）*60% = 6万元。</b></p>
        <img src="https://xqimg.imedao.com/15bd68a93b7d4d3fe44ed7bf.png" style='width:100%'>
        <p>25岁的张女士经营着自己的淘宝店，店铺营业额逐步有起色，但精力也常常出现透支。张女士没有社保，虽然现在年轻，但为避免突如其来的大病风险，她花<b>518</b>元为自己投保了无社保版的平安e生保（2017版），每年一般医疗保额300万元，恶性肿瘤医疗保额300万元。</p>
        <p>张女士有次深夜加班，不小心得了重感冒，因为忙于事业没有及时治疗引起肺炎，在医院住了4天，使用了副作用小的进口抗生素，总共花费5万。事后申请理赔，我们的<b>赔付金额=5万-免赔额1万=4万元。</b></p>
      </section>
      <copyRight></copyRight>


      <div class="bottom">
        <div class="kefu" @click='goToAssistant' v-show='!showFeeSheet'>
          <img src="../../assets/icon_assistant@3x.png" alt="">
          <p>在线咨询</p>
        </div>
        <span v-if='showFeeSheet' class='fee'>价格：{{selectedFee}}</span>
        <span v-else @click='showFeeOptions()'>保费试算</span>
        <span @click='showFeeOptions()'>立即投保</span>
      </div>


      <div id="overlay" :class='showFeeSheet ? "" : "hide"'></div>
      <div id="fee-sheet" :class='[showFeeSheet ? "" : "hide",product.product_type === "LONG_INSURANCE" ? "hideLiBotton":""]'>
        <h2>{{product.product_name}}</h2>
        <p style='font-size:0.93rem;color:#ccc;border-bottom:1px solid #F3F5F7;padding: 0.4rem 0'><span style='color:#e1322c'>﹡</span>最终价格以承保人身份信息为准</p>
        <div class="close" @click='showFeeSheet = false'>✕</div>
        <div class='options' v-for='group in feeOptions(this.product.product_sku_list)' v-if="product.product_type !== 'LONG_INSURANCE'">
          <div v-if="group.name == '生日'">
            <div>{{group.name}}：</div>
            <input id="insuredBirth" type="date" v-model="insuredBirth" placeholder="请选择" required>
          </div>
          <div v-else>
            <div>{{group.name}}：</div>
            <span v-if="group.name == '社保'" id="question_icon" @click="explain = 1">
              <img src="../../assets/question.png" id="question_icon" alt="">
            </span>
            <a :data-type="group.type" v-for='option in group.options' :class='checkOptionActive(group, option)? "selected": ""' @click='changeOption(group, option)'>{{this[group.selected]}}{{option}}</a>
          </div>
        </div>
      </div>
      <a v-if="inMobile" class="icon_go_home" @click='goHome' ></a>
    </div>
    <div v-if="explain" @click="explain = 0" id="overlay_explain">
      <div class="explain__content">
        <h2>关于社保</h2>
        <p>本产品中的社保是指社会医疗保险，包括城镇职工基本医疗保险、城镇居民基本医疗保险、新型农村合作医疗、医疗救助等政府举办的基本医疗保险项目。</p><a href="javascript:;" class="btn btn_close">关闭</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import xqBridge from '~assets/bridge.js'
import copyRight from '~components/copyRight.vue'
// import LongFeeSheet from '~components/ProductLongFeeCompute.vue'
import cancerFee from '~assets/cancer.js'

export default {
  name: 'product_detail',
  data () {
    return {
      tabTop: 0,
      loading: false,
      product: null,
      selectedAmount: '',
      selectedAge: '',
      selectedSex: '',
      selectedDuration: '',
      selectedSocial: '',
      selectedAdditional: '',
      showFeeSheet: false,
      LongFees: null,
      login: 0,
      phone: {
        'PINGAN': '95511',
        'PACX': '95511',
        'PAJK': '95511',
        'ChinaLife': '0755-95519',
        'PICC': '95518',
        'AIG': '400-820-8858按2后按1',
        'HexieHealth': '95569-5',
        'CPIC': '95500',
        'SinoSig': '95510',
        'TK': '0755-95522',
        'StarrChina': '400-999-5507',
        'PfLife': '400-821-6808按2',
        'Allianz': '400-888-3636',
        'Answern': '95303',
        'TiAn': '95505',
        'SinoSafe': '95556'
      },
      access_token: '',
      inMobile: 0,
      explain: 0,
      insuredBirth: '1990-01-01'
    }
  },
  asyncData ({ params, error }) {
    return axios.get('/api/insurance/product/detail/query.json?product_id=' + params.id)
    .then((res) => {
      return { product: res.data.data }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'User not found' })
    })
  },
  computed: {
    ageRange () {
      if (!this.product.product_sku_list) {
        return ''
      }
      let minAgeList = this.product.product_sku_list.map(sku => sku.min_age)
      let maxAgeList = this.product.product_sku_list.map(sku => sku.max_age)
      return `${Math.min.apply(Math, minAgeList)}-${Math.max.apply(Math, maxAgeList)}岁`
    },
    durationRange () {
      if (!this.product.product_sku_list) {
        return ''
      }
      let durationList = this.product.product_sku_list.map(sku => sku.insurance_duration.value)
      let min = Math.min.apply(Math, durationList)
      let max = Math.max.apply(Math, durationList)
      let result
      if (max === min) {
        result = max
      } else {
        result = `${min}-${max}`
      }
      // 长险的保障期限 如果有的话,就直接显示
      if (this.product.h5_data.insurance_period_memo) {
        return this.product.h5_data.insurance_period_memo
      }
      // 假设第一个期间的单位是天就都是天
      if (this.product.product_sku_list[0].insurance_duration.type === 'DAY') {
        return result + '天'
      }
      if (this.product.product_sku_list[0].insurance_duration.type === 'MONTH') {
        return result + '个月'
      }

      return result + '年'
    },
    skusGroupByAmount () {
      if (!this.product.product_sku_list) {
        return {}
      }
      let skusGroupByAmount = {}
      this.product.product_sku_list.forEach(sku => {
        if (!skusGroupByAmount[sku.insurance_amount]) {
          skusGroupByAmount[sku.insurance_amount] = {skus: []}
        }
        skusGroupByAmount[sku.insurance_amount].skus.push(sku)
      })

      Object.entries(skusGroupByAmount).forEach(group => {
        let amount = group[0]
        let skus = group[1].skus
        let fees = skus.map(sku => sku.premium)
        if (this.selectedAmount === '') {
          this.selectedAmount = amount
        }
        skusGroupByAmount[amount].minPremium = Math.min.apply(Math, fees)
      })
      return skusGroupByAmount
    },
    selectedFee () {
      let availableFees = []
      // 生日类计算特殊
      if (this.product.product_id === '100937') {
        return this.birthFee() + '元'
      }
      // 其他通用计算
      this.product.product_sku_list.map(sku => {
        if (this.selectedAmount && sku.insurance_amount.toString() !== this.selectedAmount.toString()) {
          return
        }
        if (this.selectedAge) {
          let ages = this.selectedAge.replace(/岁/g, '').split(' - ')
          if (ages[0] !== sku.min_age.toString() || ages[1] !== sku.max_age.toString()) {
            return
          }
        }
        if (this.selectedSex && sku.sex !== this.selectedSex) {
          return
        }

        if (this.selectedDuration && sku.insurance_duration.zh_name !== this.selectedDuration) {
          return
        }

        if (this.selectedSocial && sku.social_security !== {
          '有社保': true,
          '无社保': false
        }[this.selectedSocial]) {
          return
        }
        if (this.selectedAdditional) {
          const additional = this.product.h5_data.insure_additional
          const data = additional.data_list
          if (sku.additional !== {
            [data[0].zh_name]: '0',
            [data[1].zh_name]: '1'
          }[this.selectedAdditional]) {
            return
          }
        }

        availableFees.push(sku.premium)
      })
      if (this.product.product_type === 'LONG_INSURANCE') {
        return this.LongFees
      }
      if (availableFees.length === 1) {
        return `${availableFees[0]}元`
      } else if (availableFees.length) {
        let min = Math.min.apply(Math, availableFees)
        let max = Math.max.apply(Math, availableFees)
        return `${min} - ${max}元`
      }
    }
  },
  components: {
    copyRight
  },
  mounted () {
    // this.fetchData()
    if (!navigator.userAgent.match(/Xueqiu Android/i)) {
      // this.access_token = 'XqTest9bc8d1aa1a860e4ece82cc33252ea8c03cb61260'
      // this.checkLogin('XqTest9bc8d1aa1a860e4ece82cc33252ea8c03cb61260')
      this.checkLogin()
      this.getShare()
    } else {
      xqBridge.getAccessToken({
        success: token => {
          this.access_token = token
          this.checkLogin(token)
          this.getShare(token)
        }
      })
    }
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i)) {
      this.inMobile = 1
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    versionByAmount (amount) {
      let selectedItem
      this.product.h5_data.insurance_amount.forEach(item => {
        if (item.value.toString() === amount.toString()) {
          selectedItem = item
          // return
        }
      })

      return function (category) {
        if (selectedItem) {
          return selectedItem[category]
        } else {
          return ''
        }
      }
    },
    fetchData () {
      this.loading = true
      // fetch(`https://apibaoxian.xueqiu.com/insurance/product/detail/query.json?product_id=${this.$route.params.id}`, {credentials: 'same-origin'})
      fetch(`/api/insurance/product/detail/query.json?product_id=${this.$route.params.id}`, {credentials: 'same-origin'})
        .then(response => response.json())
        .then(json => {
          if (json.error_code) {
            alert(`${json.error_description} ${json.error_code}`)
          }
          // console.log('product list', json.data)
          this.loading = false
          this.product = json.data
          localStorage.setItem('product', JSON.stringify(json.data))
          // this.$parent.product = json.data
          window.document.title = this.product.product_name
          this.$parent.title = this.product.product_name
          // let from
          if (this.$route.query.from) {
            // from = 'from_' + this.$route.query.from
            // _hmt.push(['_trackEvent', 'show', from, '-', +this.$route.query.channel])
          } else {
            // _hmt.push(['_trackEvent', 'show', 'product', '-', +this.product.product_id])
          }
          // _hmt.push(['_trackPageview', '/' + location.hash])
          // this.share()
          // this.wxShare()
        })
    },
    showFeeOptions () {
      // show fee sheet animation
      // if (this.product.product_id === '100132') {
      //   xqBridge.redirect({
      //     type: 'PUSH',
      //     url: `/#/product/${this.$route.params.id}/compute`
      //   })
      //   return
      // }
      if (this.product.product_sku_list.length === 1 && this.product.product_type !== 'LONG_INSURANCE') {
        this.submitOrder()
      } else {
        this.showFeeSheet ? this.submitOrder() : this.showFeeSheet = true
      }
    },
    checkOptionActive (group, option) {
      if (group.type === 'amount') {
        for (let a in this.product.h5_data.insurance_amount) {
          let amountData = this.product.h5_data.insurance_amount[a]
          if (amountData.tag === option) {
            return this['selectedAmount'].toString() === amountData.value.toString()
          }
        }
      } else if (group.type === 'sex') {
        return this['selectedSex'].toString() === option.toString()
      } else if (group.type === 'age') {
        return this['selectedAge'].toString() === option.toString()
      } else if (group.type === 'duration') {
        return this['selectedDuration'].toString() === option.toString()
      } else if (group.type === 'social_security') {
        return this['selectedSocial'].toString() === option.toString()
      } else if (group.type === 'additional') {
        return this['selectedAdditional'].toString() === option.toString()
      }
      return false
    },
    changeOption (group, option) {
      if (group.type === 'amount') {
        for (let a in this.product.h5_data.insurance_amount) {
          let amountData = this.product.h5_data.insurance_amount[a]
          if (amountData.tag === option) {
            this['selectedAmount'] = amountData.value
          }
        }
      } else if (group.type === 'sex') {
        this['selectedSex'] = option
      } else if (group.type === 'age') {
        this['selectedAge'] = option
      } else if (group.type === 'duration') {
        this['selectedDuration'] = option
      } else if (group.type === 'social_security') {
        this['selectedSocial'] = option
      } else if (group.type === 'additional') {
        this['selectedAdditional'] = option
      }
    },
    feeOptions (skus) {
      if (!skus) {
        return {}
      }
      // 筛出出现的选项
      let options = {
        age: [],
        sex: [],
        duration: [],
        amount: [],
        social_security: [],
        additional: []
      }
      skus.map(sku => {
        if (!options.amount.includes(sku.insurance_amount)) {
          options.amount.push(sku.insurance_amount)
        }
        if (!options.age.includes(sku.min_age + '-' + sku.max_age)) {
          options.age.push(sku.min_age + '-' + sku.max_age)
        }
        if (!options.sex.includes(sku.sex)) {
          options.sex.push(sku.sex)
        }
        if (!options.duration.includes(sku.insurance_duration.zh_name)) {
          options.duration.push(sku.insurance_duration.zh_name)
        }
        if (!options.social_security.includes(sku.social_security)) {
          options.social_security.push(sku.social_security)
        }
        if (!options.additional.includes(sku.additional)) {
          options.additional.push(sku.additional)
        }
      })

      // 合并相同的选项
      let resultOptions = {}
      Object.keys(options).map(optionKey => {
        const option = options[optionKey]
        // remove option with all same values
        if (!option.every(value => value === option[0])) {
          resultOptions[optionKey] = option
        }
      })

      // 生成给 view 层展示的数据
      let finalOptions = []

      // 有生日类的sku 特殊处理
      if (this.product.product_id === '100937') {
        finalOptions.push({
          'name': '生日',
          'type': 'birth'
        })
      }

      if (resultOptions.amount) {
        resultOptions.amount = resultOptions.amount.map(amount => {
          for (let a in this.product.h5_data.insurance_amount) {
            let amountData = this.product.h5_data.insurance_amount[a]
            if (amountData.value === amount) {
              return amountData.tag
            }
          }
        })
        finalOptions.push({
          'name': '保额',
          'type': 'amount',
          'options': resultOptions.amount
        })
      }

      // Age
      if (resultOptions.age) {
        let ageOptions = resultOptions.age.map(age => {
          let ages = age.split('-')
          return `${ages[0]}岁 - ${ages[1]}岁`
        })
        finalOptions.push({
          'name': '年龄',
          'type': 'age',
          'options': ageOptions
        })
      }

      if (resultOptions.sex) {
        finalOptions.push({
          'name': '性别',
          'type': 'sex',
          'options': resultOptions.sex
        })
      }

      if (resultOptions.duration) {
        finalOptions.push({
          'name': '时间',
          'type': 'duration',
          'options': resultOptions.duration
        })
      }

      if (resultOptions.social_security) {
        let socialOptions = resultOptions.social_security.map(type => {
          return {
            'true': '有社保',
            'false': '无社保'
          }[type]
        })
        finalOptions.push({
          'name': '社保',
          'type': 'social_security',
          'options': socialOptions
        })
      }

      if (resultOptions.additional) {
        const additional = this.product.h5_data.insure_additional
        const data = additional.data_list
        finalOptions.push({
          'name': additional.zh_name,
          'type': 'additional',
          'options': [data[0].zh_name, data[1].zh_name]
        })
      }
      return finalOptions
    },
    birthFee () {
      // 平安癌症 计算
      try {
        const age = this.getAge(this.insuredBirth)
        // console.log(cancerFee.cancerList[3150].rule)
        let option = {'男': 'M', '女': 'F'}[this.selectedSex] + '_A1_1_' + age
        let fee
        console.log(option)
        console.log(this.selectedAmount)
        if (+this.selectedAmount === 50000) {
          fee = cancerFee.cancerList[3150].rule[option]
          fee = fee * 50
        } else {
          // 十万元以上的折扣计算
          fee = cancerFee.cancerList[3152].rule[option]
          fee = fee * this.selectedAmount / 1000
        }
        console.log(fee)
        if (fee) {
          if (String(fee).indexOf('.5') > -1) {
            return fee.toFixed(1)
          } else {
            return fee.toFixed()
          }
        } else {
          return 65
        }
      } catch (error) {
        return 65
      }
    },
    submitOrder () {
      if (!this.login) {
        const ua = navigator.userAgent
        // 在雪球客户端里 则调用登录
        if (ua.match(/Xueqiu iPhone/i) || ua.match(/Xueqiu Android/i)) {
          xqBridge.verifyTelephone({
            type: 'bind',
            success: function () {
            },
            // 取消验证 直接关闭页面
            cancel: function () {
              xqBridge.redirect({
                type: 'POP'
              })
            }
          })
        } else {
          // 如果在微信里面 调用登录
          if (ua.match(/MicroMessenger/i)) {
            window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f5bc1a5bc5a0a18&redirect_uri=https://baoxian.xueqiu.com/service/wcconnect&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(location.href)
          } else {
          // 微信之外的页面
            window.location = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx0c5bd6af79a89c2d&redirect_uri=https://xueqiu.com/service/wcconnect&response_type=code&scope=snsapi_login&state=baoxian'
          }
        }
        return
      }
      // TODO validation

      if (Object.keys(this.product.product_sku_list[0]).indexOf('social_security') > 0 && this.selectedSocial === '') {
        alert('请选择是否有社保')
        return
      }

      let nextPage = 'submit-order'
      if (this.product.h5_data.notice) {
        nextPage = 'inform'
      }
      // _hmt.push(['_trackEvent', 'click', 'goto-submit-order', '-', +this.product.product_id])

      // 没有值的 默认传第一个
      if (this.selectedDuration === '') {
        this.selectedDuration = this.product.product_sku_list[0].insurance_duration.zh_name
      }

      let formData = {
        selectedAmount: this.selectedAmount,
        selectedFee: this.selectedFee.replace('元', ''),
        selectedDuration: this.selectedDuration
      }

      if (this.selectedSocial !== '') {
        formData['selectedSocial'] = {
          '有社保': 'true',
          '无社保': 'false'
        }[this.selectedSocial]
      }
      // 分享参数传递
      if (this.$route.query.from) {
        formData['from'] = this.$route.query.from
      }
      if (this.$route.query.channel) {
        formData['channel'] = this.$route.query.channel
      }

      if (this.selectedAdditional !== '') {
        const additional = this.product.h5_data.insure_additional
        const data = additional.data_list
        formData['selectedAdditional'] = {
          [data[0].zh_name]: '0',
          [data[1].zh_name]: '1'
        }[this.selectedAdditional]
      }

      const formParams = Object.keys(formData).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
      }).join('&')
      xqBridge.redirect({
        type: 'PUSH',
        url: `/#/product/${this.$route.params.id}/${nextPage}?${formParams}`
      })
    },
    xqPush (e) {
      if (navigator.userAgent.toUpperCase().match('XUEQIU')) {
        e.preventDefault()
        xqBridge.redirect({
          type: 'PUSH',
          url: '/' + e.target.getAttribute('href')
        })
      }
    },
    goToAssistant () {
      if (navigator.userAgent.toUpperCase().match('XUEQIU')) {
        xqBridge.redirect({
          type: 'PUSH',
          url: 'https://xueqiu.com/service/customservice'
        })
      } else {
        // window.location = 'https://xueqiu.com/3748823499'
        window.open('https://xueqiu.com/3748823499')
      }
    },
    clickTab (tab) {
      this.scrollIt(document.getElementById(tab), document.querySelector('#tab li').offsetHeight, () => this.setTabActive(tab))
    },
    checkBody () {
      document.documentElement.scrollTop += 1
      const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body
      document.documentElement.scrollTop -= 1
      return body
    },
    scrollIt (element, scrollDelta, callback) {
      if (!element) {
        return
      }

      const body = this.checkBody()
      const start = body.scrollTop
      const startTime = Date.now()

      const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
      const destination = (documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop) - scrollDelta

      function scroll () {
        const now = Date.now()
        const time = Math.min(1, ((now - startTime) / 200))
        body.scrollTop = (time * (destination - start)) + start

        if (body.scrollTop === destination) {
          callback()
          return
        }
        requestAnimationFrame(scroll)
      }
      scroll()
    },
    handleScroll () {
      if (!this.product) {
        return
      }
      const bodyTop = this.checkBody().scrollTop + document.querySelector('#tab li').offsetHeight + 10
      const descTop = document.querySelector('#product-desc').offsetTop
      const lipeiTop = document.querySelector('#lipei').offsetTop
      const qaTop = document.querySelector('#qa').offsetTop
      let caseTop = document.querySelector('#case')
      if (caseTop) {
        caseTop = caseTop.offsetTop
      }
      if (caseTop && bodyTop > caseTop) {
        this.setTabActive('case')
      } else if (bodyTop > qaTop) {
        this.setTabActive('qa')
      } else if (bodyTop > lipeiTop) {
        this.setTabActive('lipei')
      } else if (bodyTop > descTop) {
        this.setTabActive('product-desc')
      }
    },
    setTabActive (tab) {
      Array.from(document.querySelectorAll('#tab li')).forEach(li => {
        if (li.getAttribute('data-tab') === tab) {
          li.classList.add('active')
        } else {
          li.classList.remove('active')
        }
      })
    },
    checkLogin (token) {
      let url = '/xueqiu/user/show.json'
      if (token) {
        url = url + '?access_token=' + token
      }
      fetch(url, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => {
        if (json.error_code || json.type === '5') {
          this.login = 0
        } else {
          this.login = 1
        }
      })
    },
    getShare (token) {
      let url = '/api/insurance/product/share/channel/query.json'
      if (token) {
        url = url + '?access_token=' + token
      }
      fetch(url, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => {
        if (json.error_code) {
          this.xqShare()
          this.wxShare()
        } else {
          this.xqShare(json.data.code)
          this.wxShare(json.data.code)
        }
      })
    },
    goHome () {
      let url
      if (this.$route.query.from) {
        url = '/#/?from=' + this.$route.query.from + '&channel=' + this.$route.query.channel
      } else {
        url = '/#/'
      }
      location.href = url
    },
    xqShare (id) {
      console.log(id)
      if (!id) {
        id = ''
      }
      const ua = navigator.userAgent
      // 在雪球客户端里 则调用分享
      if (ua.match(/Xueqiu iPhone/i) || ua.match(/Xueqiu Android/i)) {
        xqBridge.setRightNavigationButton({
          title: '分享',
          action: () => {
            var shareTitle = this.product.product_name
            var shareParams = {
              title: shareTitle,
              url: 'https://baoxian.xueqiu.com/#/product/' + this.$route.params.id + '?from=xq_share&channel=' + id,
              target: '',
              img: 'https://xqimg.imedao.com/15c3f2228dc122923f8172eb.png',
              description: this.product.h5_data.introduction
            }
            xqBridge.share(shareParams)
            // _hmt.push(['_trackEvent', 'share', 'xq', '-', +id])
          }
        })
      }
    },
    getAge (dateString) {
      var today = new Date()
      var birthDate = new Date(dateString)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    /* eslint-disable */
    wxShare (id) {
      console.log(id)
      if (!id) {
        id = ''
      }
      const that = this
      if (navigator.userAgent.match(/MicroMessenger/i)) {
        fetch('/xueqiu/service/wcshare?url=' + encodeURIComponent(location.href.split('#')[0]))
          .then(response => response.json())
          .then(response =>{
            var Title = that.product.product_name
            var Desc = that.product.h5_data.introduction
            var ImgUrl = 'https://xqimg.imedao.com/15c3f2228dc122923f8172eb.png'
            var Link = 'https://baoxian.xueqiu.com/#/product/' + that.$route.params.id + '?from=wx_share&channel=' + id
            // alert(JSON.stringify(response))
            wx.config({
              appId: response.appId,
              timestamp: response.timestamp,
              nonceStr: response.nonceStr,
              signature: response.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
            })
            wx.ready(function () {
              //好友
              wx.onMenuShareAppMessage({
                title: Title,
                desc: Desc,
                link: Link,
                imgUrl: ImgUrl,
                success: function () {
                  // 用户确认分享后执行的回调函数
                  // _hmt.push(['_trackEvent', 'share', 'wx', 'message', +id])
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              //朋友圈
              wx.onMenuShareTimeline({
                title: Title,
                link: Link,
                imgUrl: ImgUrl,
                success: function () {
                  // 用户确认分享后执行的回调函数
                  // _hmt.push(['_trackEvent', 'share', 'wx', 'timeline', +id])
                },
              })
              //qq好友
              wx.onMenuShareQQ({
                title: Title, // 分享标题
                desc: Desc, // 分享描述
                link: Link, // 分享链接
                imgUrl: ImgUrl, // 分享图标
              })
              //qq空间
              wx.onMenuShareQZone({
                title: Title, // 分享标题
                desc: Desc, // 分享描述
                link: Link, // 分享链接
                imgUrl: ImgUrl, // 分享图标
              })
            })
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              // alert(res)
            });
          })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  #product-info {
    background: rgb(243,245,247);
    padding-bottom: 51px;
    position: relative;
    min-height:100vh;
  }

  #tab {
    box-sizing: border-box;
    width: 100%;
    background-color: white;
    position: sticky;
    top: 0;
  }
  #tab {
    display: flex;
    padding: 0 0.93rem;
    border-bottom: 1px solid #f3f5f7;
  }

  #tab li {
    flex-grow: 1;
    padding: 0.93rem 0;
    margin: 0 0.2rem;
    text-align: center;
    font-size: 1.07rem;
    color: #666;
    border-bottom: 0.21rem solid #fff;
    cursor: pointer;
  }

  #tab li.active {
    color: #333;
    font-weight: bold;
    border-bottom: 0.21rem solid #3fadc5;
  }

  section {
    margin-bottom: 0.96rem;
    padding: 0.93rem;
  }

  ul.sku-list {
    display: flex;
    margin: 1rem 0;
  }
  ul.sku-list li {
    margin: 0.36rem;
    padding: 0.36rem;
    background: #F3F5F7;
    border: 1px solid #F3F5F7;
    flex-grow: 1;
    text-align: center;
    height: 4.29rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 0.29rem;
    cursor: pointer;
  }
  ul.sku-list li:nth-child(1) {
    margin-left: 0;
  }
  ul.sku-list li.active {
    color: #3FADC5;
    border-color: #3FADC5;
    background-color: #fff;
  }

  ul.sku-list li div:nth-child(1) {
    font-size: 1.07rem;
    font-weight: bold;
  }
  ul.sku-list li div:nth-child(2) {
    font-size: 0.79rem;
  }


  .sku-desc li{
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #F3F5F7;
    padding: 0.86rem 0;
  }
  .sku-desc .left {
    float: left;
    max-width: 80%;
  }
  .sku-desc .right {
    position: absolute;
    right: 0px;
  }
  .sku-desc .main-desc {
    font-size: 1.07rem;
  }
  .sku-desc .second-desc {
    font-size: 0.93rem;
    color: #aaa;
  }

  .sku-desc li.price-test {
    border-bottom: none;
  }
  .price-test .left{
    color: #ff7700;
    font-size: 1.29rem;
  }
  .price-test .right {
    color:#3fadc5;
    font-size: 1.07rem;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 600px;
    border-top: 1px solid #DADEE5;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 1.07rem;
    display: flex;
    z-index: 100;
    cursor: pointer;
  }
  .bottom span {
    width: 50%;
    display: inline-block;
    font-size: 1.07rem;
    font-weight: 500;
  }
  .bottom span:nth-child(2) {
    color: #3FADC5;
    background-color: #fff;
  }
  .bottom span:nth-child(3) {
    color: #fff;
    background-color: #3FADC5;
  }

  .bottom .fee {
    color: #ff7700!important;
  }

  #fee-sheet {
    background-color: white;
    padding: 0.93rem;
    position: fixed;
    width: 100%;
    max-width: 600px;
    bottom: 51px;
    box-sizing: border-box;
    z-index: 100;
  }

  #fee-sheet h2 {
    padding-right: 3rem;
  }

  #fee-sheet a{
    display: inline-block;
    padding: 0.5rem 0.93rem;
    margin: 0.43rem;
    background-color: #F3F5F7;
    color: #666;
    border: 1px solid #F3F5F7;
    border-radius: 2px;
    cursor: pointer;
  }

  #fee-sheet a:nth-child(1) {
    margin-left: 0;
  }

  #fee-sheet a.selected {
    border: 1px solid #3FADC5;
    color: #3FADC5;
    background-color: white;
  }

  .hide {
    display: none;
  }

  #fee-sheet .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }


  section.header p {
    color: #666;
    font-size: 0.93rem
  }

  h1 {
    font-size: 1.57rem;
  }

  h2 {
    font-size: 1.29rem;
  }

  .infobox {
    display: flex;
    border-top: 1px solid rgb(231,231,231);
    border-bottom: 1px solid rgb(231,231,231);
    padding: 1rem 0;
    margin: 1.29rem 0;
  }

  .infobox li {
    text-align: center;
    flex-grow: 1;
    border-left: 1px solid rgb(231,231,231);
  }

  .infobox li:nth-child(1) {
    border-left: none;
  }

  .infobox .name {
    font-size: 0.93rem;
    color: #aaa;
  }
  .infobox .value {
    font-size: 1.07rem;
    color: #3FADC5;
    font-weight: bold;
  }

  .infobox .amount .value {
    color: #ff7700;
  }

  .company {
    font-size: 0.93rem;
  }

  #product-desc img {
    width: 100%;
    margin: 1rem 0;
  }

  section.info {
    padding-bottom: 0;
  }

  .copyright {
    text-align: center;
    padding: 2rem;
    font-size: 0.93rem;
    color: #151515;
  }
  .copyright img {
    width: 231px;
  }

  #overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.5); /*dim the background*/
  }

  .options div {
    margin: 1rem 0 0.5rem 0;
  }

  .question {
    font-size: 1.07rem;
    font-weight: bold;
    display: flex;
  }
  .answer {
    font-size: 1.07rem;
    color: #666;
    margin: 0.57rem 0;
    display: flex;
  }

  .answer img {
    flex: 0 0 24px;
  }

  #qa p {
    padding-left: 8px;
    line-height: 24px;
  }

  #qa ul {
    margin-top: 0.93rem;
  }

  .company  {
    display: flex;
    line-height: 2.5rem;
    justify-content: space-between;
  }

  .company p img {
    width: 15px;
    padding-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
  }

  .company > img {
    max-width: 7rem;
    height: 2.5rem;
  }

  .info {
    position: relative;
  }

  .info .term-link {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.07rem;
  }

  .one-sku .sku-list, .one-sku .price-test .right {
    display: none;
  }

  #lipei ul{
    border-left: 1px solid #ccc;
    margin-left: 14px;
    margin-top: 8px;
  }

  #lipei li {
    padding-bottom: 16px;
  }

  #lipei li:last-child {
    padding-bottom: 0;
  }

  #lipei li img {
    width: 28px;
    height: 28px;
    padding-right: 10px;
    vertical-align: middle;
    margin-left: -14px;
  }

  #case{
    p,b{
      font-size: 1.07rem;
      line-height: 1.57rem;
      padding-bottom: 1rem;
    }
    b{
      color: #3FADC5;
    }
    img{
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }
  .disableScroll{
    position: fixed;
    max-width: 600px;
  }
  
  .hideLiBotton{
    padding-bottom: 0 !important;
  }
  .kefu{
    width: 5rem;
    background-color: white;
    border-right: 1px solid #DADEE5;
    line-height: 1rem;
    img{
      width: 1.29rem;
      height: 1.26rem;
      margin-top: 0.57rem;
    }
    p{
      font-size: 12px;
      color: #666666;
      line-height: 1.5rem;
    }
  }
  .icon_go_home{
    position: fixed;
    bottom: 4.29rem;
    right: 1rem;
    height: 4rem;
    width: 4rem;
    z-index: 9;
    background-image: url("https://xqimg.imedao.com/15caae417da5db3fb19401b4.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  // @media (max-device-width: 600px) {
  //   .icon_go_home{
  //     display: block
  //   }
  // }
  #question_icon{
    // display: inline-block;
    position: absolute;
    margin-left: 1.5rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    margin-top: -0.85rem;
  }

  #overlay_explain{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,0.5); /*dim the background*/
  }
  .explain__content{
    position: relative;
    width: 25rem;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    text-align: center;
    border-radius: .2rem;
    padding-top: 2.1rem;
    padding-bottom: 2.5rem;
    h2{
      font-size: 1.6rem;
      color: #3c3c3c;
    }
    p{
      font-size: 1rem;
      color: #646464;
      width: 80%;
      text-align: left;
      margin: 1.5rem auto;
    }
    .btn{
      font-size: 1.2rem;
    }
  }
  #insuredBirth{
    // float: left;
    // display: inline-block;
    height: 1rem;
    padding: 0.5rem 0.93rem;
    margin: 0.43rem;
    background-color: #F3F5F7;
    color: #666;
    border: 1px solid #F3F5F7;
    border-radius: 2px;
    cursor: pointer;
    line-height: 1rem;
    width: 10rem;
    text-align: center;
    -webkit-appearance: none;
    &::-webkit-clear-button {
      -webkit-appearance: none;
      display: none;
    }
  }
</style>

<style lang='scss'>

#qa {
  table {
    margin: 1rem auto;
    width: 100%;
    border-collapse: collapse;
  }
  h3 {
    text-align: center;
    color: #3FADC5;
  }
  /* Table Head */
  th {
    background-color: #3FADC5;
    color: white;
    /*border-bottom-width: 0;*/
  }
  tr{
    td:nth-child(1){
      // min-width: 5rem;
      margin: 5px 0px 5px 10px;
    }
  }
  td,
  th {
    padding: 5px 5px;
    font-size: 14px;
    font-weight: bold;
  }
  td {
    border-bottom: 1px solid #3FADC5;
  }
}

</style>
