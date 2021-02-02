<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-form :form="form1" layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="48">
          <a-col :span="8">
            <a-form-item label="承运商BP代码">
              <a-input placeholder="请输入" v-decorator="['code']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="承运商名称">
              <a-input placeholder="请输入" v-decorator="['name']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-button type="primary" @click="handleSearch">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card :style="{ 'margin-top': '14px' }">
      <a-table :row-key="(record, index) => index" bordered :columns="columns" :data-source="data">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <a @click="handleDelete(record)">删除</a>
        </span>
      </a-table>
    </a-card>
    <a-modal v-model="visible" title="物流承运商配置" @ok="handleInputOk" okText="确定" cancelText="取消">
      <a-form :form="form2" layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <a-col>
            <a-form-item label="承运商BP代码">
              <a-input placeholder="请输入" v-decorator="['code']" disabled></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'carrier',
  data() {
    return {
      visible: false, // 录入弹窗
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'BP代码',
          dataIndex: 'id',
        },
        {
          title: '供应商名称(中文)',
          dataIndex: 'id',
        },
        {
          title: '供应商名称(英文)',
          dataIndex: 'id',
        },
        {
          title: '承运基地数量',
          dataIndex: 'id',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [],
    }
  },
  created() {},
  mounted() {},

  methods: {
    /** 查询 */
    handleSearch() {
      let param = this.form1.getFieldsValue()
      console.log(param)
    },
    handleEdit(record) {},
    handleDelete(record) {},
    handleInputOk() {},
  },
}
</script>

<style scoped lang="less"></style>
