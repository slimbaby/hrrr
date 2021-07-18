<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
        <add-depts ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import addDepts from './components/add-depts.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    treeTools,
    addDepts
  },
  data() {
    return {
      node: null, // 当前选中的节点
      showDialog: false,
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 编辑部门节点
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    },
    // 添加部门节点
    addDepts(node) {
      this.showDialog = true
      this.node = node
      console.log(this.node)
    },
    // 获取部门信息
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      console.log(result)
    }
  }
}
</script>
<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

