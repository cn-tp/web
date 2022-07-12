import { RouteRecordRaw } from 'vue-router';
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      auth：          当前路由权限标识（多个请用逗号隔开），最后转成数组格式，用于与当前用户权限进行对比，控制路由显示、隐藏
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义动态路由
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export /** @type {*} */
	/** @type {*} */
	const dynamicRoutes: Array<RouteRecordRaw> = [
		{
			path: '/',
			name: '/',
			component: () => import('/@/layout/index.vue'),
			redirect: '/home',
			meta: {
				isKeepAlive: true,
			},
			children: [
				{
					path: '/home',
					name: 'dashboard',
					component: () => import('/@/views/dashboard/index.vue'),
					meta: {
						title: 'message.router.dashboard',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: true,
						isIframe: false,
						auth: ['base'],
						icon: 'iconfont icon-shouye',
					},
				},
				{
					path: '/app',
					name: 'applications',
					component: () => import('/@/views/applications/index.vue'),
					meta: {
						title: '应用列表',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: true,
						isIframe: false,
						auth: ['base'],
						icon: 'fa fa-desktop',
					},
				},
				{
					path: '/profile',
					name: 'profileList',
					component: () => import('/@/views/deviceProfiles/index.vue'),
					meta: {
						title: '解码配置',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['base'],
						icon: 'el-icon-s-operation',
					},
				},
				{
					path: '/device',
					name: 'deviceList',
					component: () => import('/@/views/device/index.vue'),
					meta: {
						title: '设备管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['base'],
						icon: 'el-icon-s-platform',
					},
				},
				{
					path: '/network',
					name: 'networkList',
					component: () => import('/@/views/network/index.vue'),
					meta: {
						title: '网络管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['base'],
						icon: 'el-icon-connection',
					},
				},
				{
					path: '/vendor',
					name: 'vendorList',
					component: () => import('/@/views/deviceVendor/index.vue'),
					meta: {
						title: '供应商管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['base'],
						icon: 'el-icon-office-building',
					},
				},
				{
					path: '/task',
					name: 'taskList',
					component: () => import('/@/views/task/index.vue'),
					meta: {
						title: '任务日志',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['base'],
						icon: 'el-icon-tickets',
					},
				},
				{
					path: '/user',
					name: '用户管理',
					component: () => import('/@/layout/routerView/parent.vue'),
					redirect: '/user/list',
					meta: {
						/**
						 * @title 数据来源：/src/i18n/lang/en.ts zh-cn.ts
						 */
						// title: 'message.router.location',
						title: '用户管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						auth: ['admin', 'system'],
						icon: 'fa fa-user-o',
					},
					children: [
						{
							path: '/user/list',
							name: 'userList',
							component: () => import('/@/views/user/userList.vue'),
							meta: {
								title: '用户列表',
								isLink: '',
								isHide: false,
								isKeepAlive: true,
								isAffix: false,
								isIframe: false,
								auth: ['admin', 'system'],
								icon: 'fa fa-list-ul',
							},
						},
						{
							path: '/user/add',
							name: 'userAdd',
							component: () => import('/@/views/user/userAdd.vue'),
							meta: {
								title: '新增用户',
								isLink: '',
								isHide: true,
								isKeepAlive: true,
								isAffix: false,
								isIframe: false,
								auth: ['admin', 'system'],
								icon: 'iconfont icon-caidan',
							},
						},
						{
							path: '/user/modifyPwd',
							name: 'modifyPwd',
							component: () => import('/@/views/user/modifyPwd.vue'),
							meta: {
								title: '修改密码',
								isLink: '',
								isHide: true,
								isKeepAlive: true,
								isAffix: false,
								isIframe: false,
								auth: ['base'],
								icon: 'fa fa-pencil-square-o',
							},
						},
					],
				},
			],
		},
	];

/**
 * 定义静态路由
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/autoLogin',
		name: 'autoLogin',
		component: () => import('/@/views/login/autoLogin.vue'),
		meta: {
			title: '自动登录',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
		},
	},
];
