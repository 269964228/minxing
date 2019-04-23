import Vue from 'vue';
import Router from 'vue-router';
import show from '@/components/List';  // 初始判断页面
import Zaiban from '@/components/Head/Zaiban';  
import Zhigongwen from '@/components/Head/Zhigongwen';  
import Zonggongwen from '@/components/Head/Zonggongwen';  //  总行公文文种列表页面
Vue.use(Router);
import List from '@/components/List/List'; // 数据列表页面
import Submission from '@/components/List/Submission';
import Zong001 from '@/components/MultiPage/001fawen';
import Zong002 from '@/components/MultiPage/002shouwen';
import Zong004 from '@/components/MultiPage/004jianbao';
import Zong005 from '@/components/MultiPage/005qianbao';
import Zong007 from '@/components/MultiPage/007chengyue';
import Zong008 from '@/components/MultiPage/008yuetanhuiwu';
import Zong009 from '@/components/MultiPage/009yuanhenghuiwu';
import Zong010 from '@/components/MultiPage/010bumenbianhan';
import Zong011 from '@/components/MultiPage/011gonggao';
import Zong012 from '@/components/MultiPage/012duban';
import Zong014 from '@/components/MultiPage/014bumenlianxidan';
import Zong015 from '@/components/MultiPage/015bangongjiyao';
import Zong016 from '@/components/MultiPage/016zhuantijiyao';
import Zong018 from '@/components/MultiPage/018yitishenqing';
import Zong019 from '@/components/MultiPage/019pengtouhuijiyao';
import Zong020 from '@/components/MultiPage/020hangwuhuijiyao';
import Zong025 from '@/components/MultiPage/025hetongqianding';


import Quan001 from '@/components/MultiPage2/001touweihui';
import Quan003 from '@/components/MultiPage2/003yibashou';
import Quan004 from '@/components/MultiPage2/004Zhizhouanpai';
import Quan005 from '@/components/MultiPage2/005Zongyueanpai';
import Quan014 from '@/components/MultiPage2/014fengxian';
import Quan015 from '@/components/MultiPage2/015fengxian2';
import Quan016 from '@/components/MultiPage2/016wentizixun';
import Quan023 from '@/components/MultiPage2/023touweihuijiyao';
import Quan024 from '@/components/MultiPage2/024pifutongzhidan';
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'show',
    },
    // 初始跳转页面
    {
      path: '/show',       
      name: 'Show',
      component: show,
    },
    // 文种列表页面
    {
      path: '/Zaiban',       
      name: 'Zaiban',
      component: Zaiban,
    }, {
      path: '/Zonggongwen',       
      name: 'Zonggongwen',
      component: Zonggongwen,
    }, {
      path: '/Zhigongwen',       
      name: 'Zhigongwen',
      component: Zhigongwen,
    },
    // 数据展示列表
    {
      path: '/List',      
      name: 'List',
      component: List,
    },
    //提交页面
    {
      path: '/submission',      
      name: 'Submission',
      component: Submission,
    },
    
    
    //  静态详情页面
    {
      path: '/Zong001', // 静态发文详情
      name: 'Zong001',
      component: Zong001,
    }, {
      path: '/Zong002', // 静态收文详情
      name: 'Zong002',
      component: Zong002,
    }, {
      path: '/Zong004', // 简报详情
      name: 'Zong004',
      component: Zong004,
    }, {
      path: '/Zong005', // 签报详情
      name: 'Zong005',
      component: Zong005,
    }, {
      path: '/Zong007', // 呈阅件详情
      name: 'Zong007',
      component: Zong007,
    }, {
      path: '/Zong008', // 乐坛会晤详情
      name: 'Zong008',
      component: Zong008,
    }, {
      path: '/Zong009', // 元亨会晤详情
      name: 'Zong009',
      component: Zong009,
    }, {
      path: '/Zong010', // 部门便函详情
      name: 'Zong010',
      component: Zong010,
    }, {
      path: '/Zong011', // 通知公告详情
      name: 'Zong011',
      component: Zong011,
    }, {
      path: '/Zong012', // 督办系统详情
      name: 'Zong012',
      component: Zong012,
    }, {
      path: '/Zong014', // 部门联系单详情
      name: 'Zong014',
      component: Zong014,
    }, {
      path: '/Zong015', // 办公会纪要详情
      name: 'Zong015',
      component: Zong015,
    }, {
      path: '/Zong016', // 专题会议纪要详情
      name: 'Zong016',
      component: Zong016,
    }, {
      path: '/Zong018', // 议题申请详情
      name: 'Zong018',
      component: Zong018,
    }, {
      path: '/Zong019', // 领导班子碰头会纪要详情
      name: 'Zong019',
      component: Zong019,
    }, {
      path: '/Zong020', // 领导班子行务会纪要详情
      name: 'Zong020',
      component: Zong020,
    }, {
      path: '/Zong025', // 内控审批（合同签订）详情
      name: 'Zong025',
      component: Zong025,
    }, {
      path: '/Quan001', // 投委会报审单详情
      name: 'Quan001',
      component: Quan001,
    }, {
      path: '/Quan003', // 管辖行一把手周工作安排详情
      name: 'Quan003',
      component: Quan003,
    }, {
      path: '/Quan004', // 管辖支行周工作安排详情
      name: 'Quan004',
      component: Quan004,
    }, {
      path: '/Quan005', // 总行月工作动态详情
      name: 'Quan005',
      component: Quan005,
    }, {
      path: '/Quan014', // 风险提示单详情1
      name: 'Quan014',
      component: Quan014,
    }, {
      path: '/Quan015', // 风险提示单详情2
      name: 'Quan015',
      component: Quan015,
    }, {
      path: '/Quan016', // 问题咨询单详情
      name: 'Quan016',
      component: Quan016,
    }, {
      path: '/Quan023', // 投委会会议纪要详情
      name: 'Quan023',
      component: Quan023,
    }, {
      path: '/Quan024', // 审批决议单、批复通知书详情
      name: 'Quan024',
      component: Quan024,
    },
  ],
});
export default router