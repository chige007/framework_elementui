<template>
	<div class="page">
		<div class="title">消息推送记录列表</div>
		<my-table url="message/manager/listHistory"
				  search-label-width="90px"
				  :batch-delete-btn="false"
				  :checkbox="false"
				  :add-btn="false"
				  :check-btn="false"
				  :edit-btn="false"
				  :delete-btn="false"
				  :opt-column="false"
				  :expand-column="true">
			<el-form slot="expandColumn" slot-scope="scope" class="demo-table-expand">
				<el-form-item label="消息类型：">
					<span>{{typeFormatter(scope.row, scope.column, scope.row.type)}}</span>
				</el-form-item>
				<el-form-item label="接收者：">
					<span>{{scope.row.receiver}}</span>
				</el-form-item>
				<el-form-item label="发送者：">
					<span>{{scope.row.sender}}</span>
				</el-form-item>
				<el-form-item label="标题：">
					<span>{{scope.row.subject}}</span>
				</el-form-item>
				<el-form-item label="内容：">
					<span>{{scope.row.content}}</span>
				</el-form-item>
				<el-form-item label="发送时间	：">
					<span>{{scope.row.sendTime}}</span>
				</el-form-item>
			</el-form>
			<template slot="column">
				<el-table-column prop="type"
								 label="消息类型"
								 sortable="custom"
								 :formatter="typeFormatter"
								 searchable
								 search-type="select"
								 :option-data="[{id: 'SMS', text: '短信'}, {id: 'EMAIL', text: '邮件'}]">
				</el-table-column>
				<el-table-column prop="receiver"
								 label="接收者"
								 sortable="custom"
								 searchable>
				</el-table-column>
				<el-table-column prop="subject"
								 label="标题"
								 sortable="custom"
								 searchable>
				</el-table-column>
				<el-table-column prop="sendTime"
								 label="发送时间"
								 sortable="custom"
								 searchable
								 searchType="date">
				</el-table-column>
			</template>
		</my-table>
	</div>
</template>

<script>
	export default {
		props: {},
		computed: {},
		data() {
			return {
			};
		},
		watch: {},
		methods: {
			/**
			 * 类型列格式化
			 *
			 * @param: row 行数据
			 * @param: column 列配置
			 * @param: cellValue 单元格值
			 * @param: index 行数
			 * @return: {String}
			 * @auther: 陈宇驰
			 * @date: 18/6/19 下午4:56
			 */
			typeFormatter (row, column, cellValue, index) {
				if (cellValue == 'SMS') {
					return '短信';
				} else if (cellValue == 'EMAIL'){
					return '邮件';
				}
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>