import artTemplate from 'art-template'
import fs from 'fs-extra'
export function genTemplateToFile (_this, generateDataList, generateConfigObj, filterArray) {
	console.log(filterArray)
	filterArray.filter(item => item.id !== 0).forEach(item => {
		let filtersImport = artTemplate.defaults.imports
		eval(`filtersImport['${item.name}'] = ${item.value}`)
	})
	// 渲染文件名称
	let renderName = ''
	generateConfigObj.templateList = generateConfigObj.templateList.map(item => {
		let templateFile = fs.readFileSync(item.path) + ""
		item.render = artTemplate.compile(templateFile)
		return item
	})
	generateDataList.forEach(data => {
		generateConfigObj.templateList.forEach(templateItem => {
			console.log(generateConfigObj)
			// 注册过滤器
			let generateData = data
			eval('renderName = `' + templateItem.generateName + '`')
			console.log(renderName)
			let renderTxt = templateItem.render({
				generateData: generateData
			})
			console.log(renderTxt)
			let renderPath = generateConfigObj.path + '\\' + renderName
			fs.writeFileSync(renderPath, renderTxt)
		})
	})
}

