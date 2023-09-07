<template>
	<view class="content">
		<!-- <view class="search">
			<image src="../../static/citys2.png" mode="widthFix"></image>
			<input type="text" placeholder="请输入关键字" placeholder-class="s">
			<view>搜索</view>
		</view> -->
		<view class="date">
			<scroll-view scroll-x="true">
				<view v-for="(item, index) in dates" @click="selectDate(item.date_timestamp)" :class="{ active:item.date_simple==dateSelectSimple }">
					<text class="day">{{ item.date_simple }}</text>
					<text class="des">{{ item.week_day }}</text>
					<text class="price">￥{{ item.price }}</text>
				</view>
			</scroll-view>
			<view class="icon" @click="link('/pages/Booking/Booking1')">
				<image src="../../static/citys3.png" mode="widthFix"></image> 
			</view>
		</view>
		<view class="list">
			<view class="label" v-for="(item, index) in freeys" @click="buy(item.id)">
				<view class="top">
					<view class="vi">
						<text class="time">{{ item.start_date }}</text>
						<text class="name">{{ item.start_area }}</text>
					</view>
					<view class="mid">
						<image src="../../static/citys1.png" mode="widthFix" class="f"></image>
						<image src="../../static/book6.png" mode="widthFix" class="l"></image>
						<view>
							<image src="../../static/citys.png" mode="widthFix"></image>
							<text>{{ item.times }}分</text>
						</view>
					</view>
					<view class="vi">
						<text class="time">{{ item.end_date }}</text>
						<text class="name">{{ item.end_area }}</text>
					</view>
				</view>
				<view class="bot">
					<view class="icon">
						<image src="../../static/citys1.png" mode="widthFix"></image>
						<text>{{ item.plane_name }}</text>
					</view>
					<view class="price">
						<text class="f">￥<text>{{ item.price }}</text></text>
						<!-- <text class="des">税 ￥110</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="navbar">
			<view @click="showIntroduce('goupiao')">
				<image src="../../static/s-goupiao.png" mode="widthFix"></image>
				<text>购票须知</text>
			</view>
			<view @click="showIntroduce('anquan')">
				<image src="../../static/s-anquan.png" mode="widthFix"></image>
				<text>安全须知</text>
			</view>
			<view @click="showIntroduce('dengji')">
				<image src="../../static/s-dengji.png" mode="widthFix"></image>
				<text>登机流程</text>
			</view>
			<view @click="showIntroduce('chengke')">
				<image src="../../static/s-chengke.png" mode="widthFix"></image>
				<text>乘客要求</text>
			</view>
			<view @click="showIntroduce('tuipiao')">
				<image src="../../static/s-tuipiao.png" mode="widthFix"></image>
				<text>退票说明</text>
			</view>
			<view @click="showIntroduce('lvke')">
				<image src="../../static/s-xin.png" mode="widthFix"></image>
				<text>致旅客信</text>
			</view>
			<view @click="showIntroduce('shouhou')">
				<image src="../../static/s-shouhou.png" mode="widthFix"></image>
				<text>售后服务</text>
			</view>
			<view @click="showIntroduce('yuyue')">
				<image src="../../static/s-yuyue.png" mode="widthFix"></image>
				<text>预约机票</text>
			</view>
			<view @click="showIntroduce('zhongzhuan')">
				<image src="../../static/s-zhongzhuan.png" mode="widthFix"></image>
				<text>中转飞行</text>
			</view>
		</view>
		
		<u-popup v-model="popShow" mode='bottom'>
			<view class="fade_aircraft">
				<image src="../../static/close.png" mode="widthFix" class="close" @click="popShow = false"></image>
				<!-- 标题展示 -->
				<text class="title" v-if="showType=='goupiao'">购票须知</text>
				<text class="title" v-if="showType=='anquan'">安全提示</text>
				<text class="title" v-if="showType=='dengji'">登机流程</text>
				<text class="title" v-if="showType=='chengke'">乘客要求</text>
				<text class="title" v-if="showType=='tuipiao'">退票说明</text>
				<text class="title" v-if="showType=='lvke'">致旅客信</text>
				<text class="title" v-if="showType=='shouhou'">售后服务</text>
				<text class="title" v-if="showType=='yuyue'">预约机票</text>
				<text class="title" v-if="showType=='zhongzhuan'">中转飞行</text>
				
				<scroll-view scroll-y="true" style="height: 65vh;margin-top: 20rpx;">
				<view class="label" v-if="showType === 'goupiao'">
					<view class="slide">
						<text class="des">1、旅客在网上购票必须遵守《旅客须知》及中国民用航空总局颁布的各项有关规定，并对网上购票的各项内容负责。</text>
						<text class="des">2、通航飞行对于乘机人有一定的要求。在公安有犯罪证明和案底，或者处于被限制高消费期间的人群，直升机飞行安检将一律不予通过。该人群购票后才发现该问题存在，请及时联系客服取消订单。否则，飞机出行当日被拦截上机，费用不得退换，后果自我承担。</text>
						<text class="des">3、购票人应严格遵守政府主管部门对乘坐通航班机所需有效证件的规定，保证乘机人证件合法性和有效性， 如因证件与姓名不符或证件失效等问题产生的后果均由购票人负责。</text>
						<text class="des">4、购票人在网上订票时，必须如实填写乘机人的相关个人资料和联系方法，因资料不清或不详造成购票后的一系列经济损失由购票人承担。</text>
						<text class="des">5、购票人必须在预订座位后的15分钟内完成出票手续（即网上支付），系统产生购票信息后即为支付成功，请购票人在订单“待出行”中予以确认。逾时支付将被视作支付不成功，该次订座自动取消。</text>
						<text class="des">6、所有航班于起飞前45分钟停止值机。</text>
						<text class="des">7、如遇天气原因导致航班延误2小时以上，旅客可选择全额退款；如因航空管制等其他不可抗力因素（除天气原因）导致航班延误，旅客若选择退票则收取100%的手续费；若由于天气、突发事件、空中管制等不可抗力因素导致航班取消，仅全额原路退返机票费用；旅客所产生的餐食、住宿、交通等费用由旅客自理，我司不承担此费用。</text>
						<text class="des">8、当航班行程显示“已完成”时，可提供发票开具服务。请购票人务必确认开票信息无误后提出开票需求，系统将在7个工作日内将电子发票发送至填写的邮箱中。若因开票信息不符而造成未收到发票或无法进行报销的，系统不予二次开票，后果均有购票人负责。</text>

					</view>
				</view>
				
				<view class="label" v-if="showType == 'anquan'">
					<view class="slide">
						<text class="des">尊敬的客人： </text>
						<text class="des">你好！为确保您的旅行安全，我公司就乘机中应注意的问题与安全事项，向您提示与告知，请您仔细阅读以下注意事项：</text>
						<text class="des">（1）旅客需托运的化妆品为液体时，每瓶不超过100ml（以瓶身标识为准），可分装携带，同类型化妆品不超过一瓶。本公司及机场不提供任何寄存服务。</text>
						<text class="des">（2）行程中所有行李（除手机、充电宝随身携带外）尺寸不超过长64cm×宽41cm×厚26cm，每人可携带行李总重不超过10KG。 </text>
						<text class="des">（3）旅客不可以携带超过100wh锂电池的电子设备、2W毫安充电宝登机，但任何使用可充电电池的电子设备：如手机、充电宝（2W毫安以下）等。均只能随身携带，严禁作为行李放置在飞机后货舱中。</text>
						<text class="des">（4）本航班严禁运输任何酒水类物品，如矿泉水、八宝粥、果冻等。</text>
						<text class="des">（5）禁止随身携带法律、行政法规规定的危险品、违禁品和管制物品乘坐通用航空器，如渔具、指甲刀、水果刀、打火机、防晒喷雾、无人机等。其他不可登机物品可咨询航空公司客服进行确认。 </text>
						<text class="des">（6）旅客禁止携带宠物乘坐本航班，如猫、狗、乌龟、蚕宝宝、蚯蚓等。 </text>
						<text class="des">（7）为避免安全隐患，乘机时禁止旅客穿戴帽子、墨镜、拖鞋（包括人字拖）等物件。</text>
						<text class="des">（8）乘客必须保证自身身体健康良好的前提下进行岛际飞行，不得欺骗隐瞒。重病旅客、孕妇（怀孕超过32周），应持有县级（含）以上医疗单位出具的适合乘机证明，并经航空公司同意后，方可购票乘机。如因自身原因发生的任何意外，我公司不承担责任。  </text>
						<text class="des">（9）4周岁以下和65周岁以上乘客不予购票。 </text>
						<text class="des">（10）不建议年龄较大或有高血压、心脏病、糖尿病、身体残疾、腿脚不便等不适宜旅游的客人参与，如执意参加请提前征得医生或家属子女同意并备好药品，如因自身原因发生的任何意外，我公司不承担责任。  </text>
						<text class="des">（11）如有晕机、不适请提前跟工作人员说明情况。</text>
						<text class="des">（12）在乘机过程中如出现乏力、多汗、头晕、眼花、心悸等症状时，应及时与飞行员沟通，不可勉强坚持。</text>
						<text class="des">（13）请您在规定时间内到达机场指定集合地点；请务必带好有效身份证件，儿童无身份证须带户口本原件；因自身原因造成无法登机或延误，乘客自行承担相关损失。  </text>
						<text class="des">（14）证件和贵重物品，如护照、身份证、机票、现金、支票、邀请函原件和复印件等，请务必随身携带，切勿遗落在机舱内。 </text>
						<text class="des">（15）登机前配合安全检查，上机坐稳后扣好安全带，听从飞行员安排指挥，不得在机舱内随意走动。 </text>
						<text class="des">（16）乘机时请坐稳扶好，注意颠簸，以免扭伤身体，不得在乘机过程中随意更换座位。</text>
						<text class="des">（17）飞机落地地后，请您不要急于下机，听从管理人员安排，注意检查随行物品。  </text>
						<text class="des">（18）上下飞机时，请注意地面，以防滑倒摔倒。 </text>
						<text class="des">（19）请自觉维护机舱内的卫生，不得乱扔垃圾。 </text>
						<text class="des">（20）因不可抗力原因（天气、自然灾、战区空中管制等），致使飞行任务无法按照原计划执行，已起飞中途返场的，我公司不承担票务返还及任何经济赔偿，未执行飞行的航班，我公司会全额退还机票费用。 </text>
						<text class="des">（21）飞行全程保持拍摄设备关机，不得进行空中拍摄。 </text>
						<text class="des">（22）乘机人应在乘机前认真阅读安全须知，并在乘机过程中严格遵守相关规定。如乘客未按我公司相关乘机要求和舱内操作规范执行，所导致的个人乘机人人身伤害，我公司不承担任何责任。 </text>
						<text class="des">本人已阅读上述注意事项及安全提示，并对自己的人身及财物安全负责。 </text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'dengji'">
					<view class="slide">
						<text class="des">一、旅客抵达时间</text>
						<text class="des">1、深圳南头直升机场：旅客至少在航班起飞前30分钟抵达机场候机;</text>
						<text class="des">2、珠海九洲机场：旅客至少在航班起飞前30分钟抵达机场候机；</text>
						<text class="des">二、安检流程</text>
						<text class="des">1、旅客自行安排直接抵达机场，在机场候机厅完成安检后值机；</text>
						<text class="des">2、禁止携带违禁品，如：易燃易爆品、压力罐体、枪支弹药、打火机、管制刀具、放射性物品、宠物、有毒物品等；电脑充电宝等提早拿出待检；手机与充电宝等随人登机，其他物品货仓托运。</text>
						<text class="des">三、值机流程</text>
						<text class="des">1、进入候机室后，在值机人员引导下，旅客有序进行行李与人员分别称重登记；</text>
						<text class="des">2、值机人员向旅客宣讲安全须知与旅客告知书；</text>
						<text class="des">3、旅客观看登机须知视频、签署承诺书，等候登机。</text>
						<text class="des">四、登机前流程</text>
						<text class="des">1、起飞前，值机人员向旅客讲解救生衣使用方式，并协助旅客穿戴妥当；</text>
						<text class="des">2、旅客在值机人员引领下有序搭乘摆渡车（岛屿机场无需搭乘），进入指定机坪登机。</text>
						<text class="des">五、登机中流程</text>
						<text class="des">1、旅客在抵达机坪后必须严格遵守机坪引领人员的指示低头进入登机区域，期间注意眼镜帽子围巾等物品的保存防止吹掉；</text>
						<text class="des">2、登机后系好保险带，戴上降噪耳罩等候起飞；</text>
						<text class="des">3、为了飞行安全，飞行中严禁与机组飞行人员进行交流，禁止触碰直升机内部舱门和具有红色标记的部件。</text>
						<text class="des">六、下机流程</text>
						<text class="des">抵达目的地机场后，旅客解开安全带，等待机组引领人员引领下机，并将降噪耳机以及救生衣交于机场服务人员，拿取行李后跟随摆渡车（岛屿机场无车）离开机场。</text>
				
					</view>
				</view>
				
				<view class="label" v-if="showType == 'chengke'">
					<view class="slide">
						<text class="des">1、旅客按秩序完成候机准备，听从工作人员安排，不得场内嬉戏打闹；</text>
						<text class="des">2、4周岁以下幼儿不可乘机，4-15周岁儿童乘机需监护人陪同；</text>
						<text class="des">3、有以下情况人员不宜参与飞行；</text>
						<text class="des">a、传染性疾病患者</text>
						<text class="des">b、精神病患者</text>
						<text class="des">c、心脑血管疾病患者</text>
						<text class="des">d、呼吸系统疾病患者</text>
						<text class="des">e、做过胃肠手术的人员术后10天内不能乘坐飞机</text>
						<text class="des">f、严重贫血的病人</text>
						<text class="des">g、耳鼻喉病患者及临产孕妇</text>
						<text class="des">4、禁止携带枪支、弹药、管制刀具、易燃易爆、放射性物品、宠物和有毒物品等影响飞行安全的物品乘机；</text>
						<text class="des">5、进入停机坪后请按照引导员指引上下机，座位安排由现场工作人员根据配载情况指定，请听从工作人员安排；</text>
						<text class="des">6、航班全程禁烟，严禁携带宠物乘机，随行行李需要托运；</text>
						<text class="des">7、乘机时需服从机长的指挥安排，切勿乱摸、乱动舱内任何操控装置与设备，及拿走机上安全用品或私开安全门，不仅可能触犯法律，更可能危及自己和其他人员的生命安全。</text>
						<text class="des">8、飞机起飞前需关闭手机、摄像机、照相机等拍摄工具，因航线涉及军事区域，全程不得拍照。</text>
						<text class="des">9、由于疫情影响，为各位乘客健康考虑，乘机需佩戴口罩且持有绿色健康码和行程码。</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'tuipiao'">
					<view class="slide">
						<text class="des">[免费行李规定]</text>
						<text class="des">行程中所有行李一律全部托运，单件托运行李尺寸不超过76cm×51cm×32cm，每人免费托运总重为10KG。</text>
						<text class="des">[退订收费说明]</text>
						<text class="des">起飞前24小时之前，收取40%；起飞前24小时（含）至起飞后收取100%。</text>
						<text class="des">[改签收费说明]</text>
						<text class="des">此航班一律不得改签。</text>
						<text class="des">[特别说明]</text>
						<text class="des">如遇天气原因导致航班延误2小时以上，旅客可选择全额退款；</text>
						<text class="des">如因航空管制等其他不可抗力因素（除天气原因）导致航班延误，旅客若选择退票则收取100%的手续费；</text>
						<text class="des">若由于天气、突发事件、空中管制等不可抗力因素导致航班取消，仅全额原路退返机票费用，旅客所产生的餐食、住宿、交通等费用由旅客自理，我司不承担此费用。</text>
						<text class="des">[其他说明]</text>
						<text class="des">预订提供航班信息均为计划信息，以实际乘坐航班为准。</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'lvke'">
					<view class="slide">
						<text class="des">亲爱的旅客：</text>
						<text class="des">您好！</text>
						<text class="des">为了能够予您一段美妙的旅途时光，我们将努力为广大旅客提供安全畅通、便捷高效、和谐舒适的优质服务。</text>
						<text class="des">考虑到很多乘客是初次乘坐直升机，不了解通航与民航间的区别，现将通航运营期间可能会遇到的问题提前告知于您：</text>
						<text class="des">1.直升机不同于普通飞机，易受天气、航空管制等因素影响，导致航班延误或取消的情况实属正常；</text>
						<text class="des">2.由于直升机航线运行轨迹途径军事区域，故乘机后旅客一律不得对窗外的景色进行拍摄；</text>
						<text class="des">3.机场办理安检手续的二号道口6月以前处于施工维修状态，旅客需要绕道而行，故增加不少脚程。</text>
						<text class="des">因此，我们为以上或许会给您造成的困扰与不便致上深深的歉意，并希望您能谅解!请您认真阅读本告知书，合理安排行程后再行购票。同时，我们也会全面提升应急事件的处置能力和服务保障水平，若遇到航班延误及取消，我们将会提前通知，极力规避不佳的状况出现。</text>
						<text class="des">最后，衷心祝愿您身体健康、阖家幸福！</text>
						<text class="des">祝您旅途愉快~</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'shouhou'">
					<view class="slide">
						<text class="des">售后服务</text>
						<text class="des">安全提示安全提示安全提示安全提示</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'yuyue'">
					<view class="slide">
						<text class="des">预约机票</text>
						<text class="des">1111</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'zhongzhuan'">
					<view class="slide">
						<text class="des">中转飞行</text>
						<text class="des">2222</text>
					</view>
				</view>
				
				</scroll-view>
				<view class="buttons" @click="popShow = false">确定</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import { FreeyList } from "@/api/freey"
	export default {
		data() {
			return {
				dates: [],
				freeys: [],
				dateSelectSimple: '',
				popShow: false,
				showType: '',
			}
		},
		onLoad() {
			var that = this
			FreeyList({}, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.dates = res.data.dates
				that.freeys = res.data.freeys
				that.dateSelectSimple = res.data.selectDate
			})
		},
		methods: {
			link(url){
				uni.navigateTo({
					url,
				})
			},
			links(url){
				uni.switchTab({
					url,
				})
			},
			buy: function(id) { 
				uni.navigateTo({
					url: '/pages/confire/confire?id='+id+'&number=1&from=ferry'
				})
			},
			selectDate: function(timestamp) {
				var that = this
				FreeyList({
					'date': timestamp
				}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return
					}
					that.dates = res.data.dates
					that.freeys = res.data.freeys
					that.dateSelectSimple = res.data.selectDate
				})
			},
			showIntroduce: function(page) {
				console.log(page)
				this.popShow = true
				this.showType = page
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F7F7F7;
	}
	.content{
		width: 100%;
		min-height: 100vh;
		padding: 30rpx 24rpx;
		position: relative;
		.search{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			border: 1px solid #FFFFFF;
			height: 72rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			padding-left: 13rpx;
			image{
				width: 30rpx;
			}
			input{
				flex: 1;
				height: 100%;
				font-size: 28rpx;
				color: #fff;
				padding-left: 9rpx;
			}
			.s{
				color: #fff;
			}
			view{
				width: 108rpx;
				height: 58rpx;
				background: #FFFFFF;
				border: 1px solid #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 5rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 28rpx;
				z-index: 99;
				color: #2764F2;
			}
		}
		.list{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			margin-top: 27rpx;
			.label{
				width: 100%;
				height: 185rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				margin-bottom: 26rpx;
				.bot{
					width: 100%;
					height: 61rpx;
					border-top: 1px solid #EEEEEE;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 36rpx 0 39rpx;
					.icon{
						display: flex;
						align-items: center;
						image{
							width: 27rpx;
							margin-right: 13rpx;
						}
						text{
							font-size: 24rpx;
							color: #444A58;
						}
					}
				}
				.top{
					overflow: hidden;
					min-height: 123rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.mid{
						overflow: hidden;
						.f{
							display: block;
							margin: 0 auto;
							width: 34rpx;
							margin-bottom: 4rpx;
						}
						.l{
							display: block;
							margin: 0 auto;
							width: 100rpx;
							margin-bottom: 6rpx;
						}
						view{
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 18rpx;
								margin-right: 6rpx;
							}
							text{
								font-size: 20rpx;
								color: #444A58;
							}
						}
					}
					.vi{
						overflow: hidden;
						width: 40%;
						padding-bottom: 5rpx;
						.time{
							display: block;
							text-align: center;
							font-size: 36rpx;
							font-weight: bold;
							margin-bottom: 10rpx;
							color: #222222;
						}
						.name{
							display: block;
							text-align: center;
							font-size: 24rpx;
							color: #444A58;
							padding: 0 20rpx;
						}
					}
				}
			}
		}
		.date{
			width: 702rpx;
			position: relative;
			z-index: 99;
			background: #fff;
			margin: 0 auto;
			margin-top: 22rpx;
			overflow: hidden;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			height: 126rpx;
			.icon{
				position: absolute;
				right: 0;
				top: 0;
				width: 106rpx;
				z-index: 999;
				padding-right: 33rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 100%;
				background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1));
				image{
					width: 44rpx;
				}
			}
			scroll-view{
				width: 100%;
				height: 100%;
				white-space: nowrap;
				view{
					display: inline-block;
					height: 100%;
					width: 121rpx;
					position: relative;
					padding: 24rpx 0 0 0;
					&::after{
						content: '';
						width: 1px;
						height: 102rpx;
						background: #EEEEEE;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.day{
						display: block;
						text-align: center;
						font-size: 28rpx;
						color: #000000;
						line-height: 1;
					}
					.des{
						display: block;
						text-align: center;
						font-size: 30rpx;
						color: #000000;
						line-height: 39rpx;
						opacity: 0.5;
					}
					.price{
						display: block;
						text-align: center;
						font-size: 22rpx;
						color: #000000;
						line-height: 1;
					}
				}
			}
		}
		&::after{
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #F7F7F7);
		}
		.active {
			background: #60b1f1;
		}
		.navbar{
			overflow: hidden;
			width: 702rpx;
			margin: 0 auto;
			background: #fff;
			position: absolute;
			margin-top: 70rpx;
			//border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			padding: 54rpx 0 9rpx 0;
			display: flex;
			margin-bottom: 43rpx;
			flex-wrap: wrap;
			z-index:9999;
			view{
				width: 33.33%;
				overflow: hidden;
				margin-bottom: 48rpx;
				image{
					display: block;
					margin: 0 auto;
					width: 98rpx;
					margin-bottom: 5rpx;
					height: 40rpx;
					width: 40rpx;
				}
				text{
					display: block;
					font-size: 28rpx;
					color: #6C768D;
					text-align: center;
				}
			}
		}
	}
	
	.fade_aircraft {
		overflow: hidden;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		position: relative;
		padding: 80rpx 35rpx;
	
		.buttons {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 35rpx;
			color: #FFFFFF;
		}
	
		.label {
			width: 100%;
	
			.slide {
				overflow: hidden;
				width: 100%;
				background: #EEEEEE;
				border-radius: 10rpx;
				padding: 28rpx;
	
				.pic {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
	
					image {
						width: 306rpx;
						margin-top: 40rpx;
					}
				}
	
				.titles {
					display: block;
					font-size: 30rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					color: #444A58;
					margin-bottom: 30rpx;
				}
	
				.des {
					display: block;
					font-size: 30rpx;
					color: #444A58;
					line-height: 45rpx;
					//text-indent: 30rpx;
				}
			}
	
			.line {
				width: 100%;
				height: 91rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				&.on {
					.icon {
						view {
							background-image: url('../../static/confire4.png');
						}
					}
	
					.down image {
						transform: rotate(180deg);
					}
				}
	
				&.on1 {
					.down image {
						transform: rotate(180deg);
					}
				}
	
				.down {
					display: flex;
					align-items: center;
	
					text {
						font-size: 26rpx;
						opacity: 0.5;
						margin-right: 22rpx;
						color: #444A58;
					}
	
					image {
						width: 23rpx;
						transition: all .2s;
					}
				}
	
				.icon {
					height: 100%;
					display: flex;
					align-items: center;
	
					view {
						width: 29rpx;
						height: 29rpx;
						background-image: url('../../static/confire3.png');
						background-size: 100% 100%;
						margin-right: 26rpx;
					}
	
					text {
						font-size: 26rpx;
						color: #444A58;
					}
				}
			}
		}
	}
	
	.close {
		width: 36rpx;
		position: absolute;
		right: 45rpx;
		top: 27rpx;
		z-index: 999;
	}
	
	.title {
		display: block;
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing: 1rpx;
		color: #444A58;
		text-align: center;
	}
	
</style>
