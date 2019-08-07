<template>
  <div>
    <el-row v-for="(page, index) of pages" :key="index">
      <el-col
        :span="6"
        v-for="(item, innerindex) of page"
        :key="item.projectId"
        :offset="innerindex > 0 ? 2 : 1"
      >
        <el-card shadow="hover" class="box-card" style="height:222px;">
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-s-tools primary-indicator"></i>
              &nbsp;{{item.name}}
            </span>
            <i v-if="item.instance[0].status === 'UP'" class="el-icon-success success-indicator"></i>
            <i v-else class="el-icon-error error-indicator"></i>
          </div>
          <div class="text-item">
            <div>
              <div style="display:inline;width:30%">实例数量：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance.length}}</div>
            </div>
            <p></p>
            <div>
              <div style="display:inline;width:30%">实例标识：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance[0].instanceId}}</div>
            </div>
            <p></p>
            <div>
              <div style="display:inline;width:30%">主机地址：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance[0].hostName}}</div>
            </div>
            <p></p>
            <div>
              <div style="display:inline;width:30%">应用名称：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance[0].app}}</div>
            </div>
            <p></p>
            <div>
              <div style="display:inline;width:30%">IP地址：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance[0].ipAddr}}</div>
            </div>
            <p></p>
            <div>
              <div style="display:inline;width:30%">更新时间：</div>
              <div style="display:inline;width:70%;float:right">{{item.instance[0].lastUpdate}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import apis from '../../api/index';
    import axios from "axios";

    export default {
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                data : [],
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        
        methods: {
            formatNumber : function(n) {
                n = n.toString()
                return n[1] ? n : '0' + n
            }
        },

        computed: {
            pages () {
                const pages = []
                this.data.forEach((item, index) => {
                    const page = Math.floor(index / 3)//3代表3条为一行，随意更改
                    if (!pages[page]) {
                        pages[page] = []
                    }
                    pages[page].push(item)
                })
                return pages
            }
        },

        async mounted() {
            
            // await this.$get(apis.baseUrl + "services.json").then(
            await this.$get('http://bmwpoc.cdkapps.cn:30090/sm/api/v1/apps').then(
                res=>{
                    if (res.code == 200) {
                        this.data = res.data;
                        this.data.forEach(item=>{
                            if (item.instance[0].lastUpdatedTimestamp && item.instance[0].lastUpdatedTimestamp != '') {
                                const dt = new Date(parseInt(item.instance[0].lastUpdatedTimestamp))
                                const year = dt.getFullYear()
                                const month = dt.getMonth() + 1
                                const day = dt.getDate()
                                const hour = dt.getHours()
                                const minute = dt.getMinutes()
                                const second = dt.getSeconds()

                                const dtStr = [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
                                item.instance[0].lastUpdate = dtStr;
                            } else {
                                item.instance[0].lastUpdate = "";
                            }
                        })
                    }
                },
                err=>{
                    console.log(JSON.stringify(err))
                }
            )
        }

    }

</script>


<style scoped>
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}

.box-card {
  width: 260px;
}

.clearfix {
  font-size: 14px;
}

.primary-indicator {
  color: #409eff;
  font-size: 16px;
}

.success-indicator {
  float: right;
  padding: 3px0;
  color: #67c23a;
  font-size: 20px;
}

.error-indicator {
  float: right;
  padding: 3px0;
  color: #f56c6c;
  font-size: 20px;
}

.text-item {
  color: #c1c1c1;
  font-size: 12px;
}
</style>
