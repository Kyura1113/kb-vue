<template>
	<div class="editor">
		<div class="editor-bar">
			<div class="editor-title">
				<input class="editor-input" placeholder="请输入标题..." v-model="form.title" />
			</div>
			<div class="editor-btn-group">
				<a-button class="editor-btn" value="small">草稿</a-button>
				<a-popover title="添加封面图片" trigger="click">
					<template slot="content">
						<a-upload class="editor-upload" name="file" :multiple="false" list-type="picture-card" :file-list="form.fileList" :customRequest="handleCoverUpload" :remove="handleRemove" @preview="handlePreview">
							<div v-if="form.fileList.length < 1">
								<a-icon type="plus"/>
								<div class="ant-upload-text">
									点击上传
								</div>
							</div>
						</a-upload>
					</template>
					<a-button class="editor-btn">上传封面</a-button>
				</a-popover>
				<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
					<img alt="example" style="width: 100%" :src="previewImage" />
				</a-modal>
				<a-popover title="选择标签" trigger="click" placement="bottomRight">
					<template slot="content">
						<section class="editor-tags">
							<template v-for="tag in tags">
								<a-checkable-tag :key="tag.label" v-model="tag.checked">{{ tag.label }}</a-checkable-tag>
							</template>
						</section>
						<div class="editor-selector">
							<a-auto-complete v-model="searchValue" size="small" :data-source="dataSource" style="width: 120px" placeholder="请输入标签..." 
							@search="handleSelectorSearch" @change="handleSelectorChange"></a-auto-complete>
							<a-button v-if="searchValue" value="mini" style="margin-left: 10px" size="small" @click="handleAddTag">添加</a-button>
						</div>
						<a-button class="editor-btn" size="small" @click="handlePublish">确定</a-button>
					</template>
					<a-button class="editor-btn">发布</a-button>
				</a-popover>
			</div>
		</div>
		<mavon-editor class="editor-mavon" v-model="form.content" ref="md" defaultOpen="preview" :subfield="true" :ishljs="true" 
		codeStyle="rainbow" :toolbars="toolbarsValue" @imgAdd="handleUploadImg" @change="changeMavon" ></mavon-editor>
	</div>
</template>
<script>
	import Upload from '../../utils/upload.js'
	
	export default {
		data() {
			return {
				previewVisible: false,
				previewImage: '',
				form: {
					title: null,
					content: '',
					fileList: [],
				},
				searchValue: null,
				dataSource: [],
				tags: [
					{ id: 1, checked: false, label: 'VUE' },
					{ id: 2, checked: false, label: 'HTML' },
					{ id: 3, checked: false, label: 'CSS' },
					{ id: 4, checked: false, label: 'CANVAS' },
					{ id: 5, checked: false, label: 'SVG' },
					{ id: 6, checked: false, label: 'JAVASCRIPT' },
				],
				toolbarsValue: {
					bold: true, // 粗体
					italic: true, // 斜体
					header: true, // 标题
					underline: true, // 下划线
					strikethrough: true, // 中划线
					mark: true, // 标记
					superscript: true, // 上角标
					subscript: true, // 下角标
					quote: true, // 引用
					ol: true, // 有序列表
					ul: true, // 无序列表
					link: true, // 链接
					imagelink: true, // 图片链接
					code: true, // code
					table: true, // 表格
					fullscreen: true, // 全屏编辑
					readmodel: true, // 沉浸式阅读
					htmlcode: true, // 展示html源码
					help: true, // 帮助
					undo: true, // 上一步
					redo: true, // 下一步
					trash: true, // 清空
					save: false, // 保存（触发events中的save事件）
					navigation: true, // 导航目录
					alignleft: true, // 左对齐
					aligncenter: true, // 居中
					alignright: true, // 右对齐
					subfield: true, // 单双栏模式
					preview: true, // 预览
				},
			}
		},
		methods: {
			// 绑定@imgAdd event
			async handleUploadImg(pos, file) {
				const path = await Upload.imgUpload(file)
				if(!path) return this.$message.error("上传图片失败")
				this.$refs['md'].$img2Url(pos, path)
			},
			changeMavon() {},
			handlePublish() {
				if(!this.form.title) return this.$message.error('未填写标题,发布失败')
				if(this.form.content === '') return this.$message.error('未填写内容,发布失败')
				const _this = this
				const tags = function(){
					let arr = []
					_this.tags.map(t=>{
						if(t.checked) arr.push(t.id)
					})
					return arr
				}()
				if(!tags.length > 0) return this.$message.error('未选择标签,发布失败')
				
				const contentData = this.form.content.toString().replace(/'/g, "\\'")
				const description = contentData.substring(0, 250).replace(/\r|\n|\\s/g, "")
				const p = {
					title: this.form.title,
					content: contentData,
					creator: 0,
					desc: description,
					cover: this.form.fileList.length > 0 ? this.form.fileList[0].url : '',
					tags: tags.toString()
				}
				console.log(p)
				this.$http.article.publish(p)
				.then(res=>{
					this.$message.success(res.data.msg)
				})
				.catch(err=>{
					this.$message.error(err)
				})
			},
			handlePreview(file){
				this.previewImage = file.url || file.preview;
				this.previewVisible = true;
			},
			handleRemove(){
				this.form.fileList = []
			},
			async handleCoverUpload(opt){
				const path = await Upload.imgUpload(opt);
				this.form.fileList = [{
					uid: '0',
					name: 'image' + new Date().getTime(),
					status: path ? 'done' : 'error',
					url: path
				}]
			},
			handleCancel() {
				this.previewVisible = false;
			},
			handleSelectorSearch(value){
				if(value === '') return
				this.$http.tag.find({ name: value, fuzzy: 1 })
				.then(res=>{
					const data = res.data.data
					let dSource = []
					data.map(d => dSource.push(d.name))
					this.dataSource = dSource
				}).catch(err=>{
					console.log(err)
				})
			},
			handleSelectorChange(value){
				this.searchValue = value
			},
			handleAddTag(){
				const tagName = this.searchValue.toUpperCase()
				this.$http.tag.add({ name: tagName })
				.then(res=>{
					const id = res.data.data.id
					let tagIndex = this.tags.findIndex(tag=> {return tag.id === id})
					if(tagIndex > -1){
						this.tags[tagIndex].checked = true
					}else{
						this.tags.push({ id: id, label: tagName, checked: true})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>
