<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" :offset="1">
                <el-card shadow="hover" class="box-card" style="height:222px;">
                    <div slot="header" class="clearfix">
                        <span><i class="el-icon-search"></i> 代码</span>
                    </div>
                    <div class="bottom clearfix">
                        <el-button @click="gotoSonarQube()">
                            质量管理<i class="el-icon-right"></i>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import apis from '../../api/index'; 

export default {
    data() {
        return {

        }
    },

    methods : {
        gotoSonarQube : function(){
            window.open(apis.sonarQubeUrl);
        }
    }

}
</script>
<style scoped>
    .el-row {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .el-card.is-hover-shadow:hover {
        box-shadow:0 2px 12px 0 rgba(0,0,0,0.5);
    }

    .box-card {
        width: 260px;

    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }

    .bottom {
        margin-top: 45%;
        line-height: 12px;
        text-align: right;
    }

    .button {
        padding: 0;
        float: right;
    }


</style>