<template>
	<input type="text" class="form-control" :class="className" :disabled="disabled" placeholder="{{title}}" title="{{title}}" v-model="value">
</template>
<script>
	export default {
		data(){
			return {};
		},
		props: {
			"className":String,
			"title":{
				type:String,
				required:true
			},
			"value":{
				required:true
			},
			"selectHandler":{
				type: Function
			},
			"options":{
				type: Object
			},
			"showYear":{
				type: Boolean,
				default : false
			},
			"disabled" : {
				type : Boolean,
				default : function(){
					return false;
				}
			},
			"selected" : {
				type : Date,
				default : function(){
					return '';
				}
			}
		},
		methods:{
			setStartDate:function(date) {
				$(this.$el).datepicker("option","minDate",date);
			},
			setEndDate:function(date) {
				$(this.$el).datepicker("option","maxDate",date);
			},
			setDefaultValue: function (date) {
				$(this.$el).datepicker("setDate",date);
				let current = $(this.$el).val();
				this.value = current;
			}
		},
		ready(){
			let self = this;
			$(this.$el).datepicker({
				changeYear: self.showYear,
				onSelect: function (selectedDate) {
					self.selectHandler && self.selectHandler(selectedDate);
					self.value = selectedDate;
				}
			});
			if (self.showYear) {
				let year = new Date().getFullYear();
				$(this.$el).datepicker("option","yearRange",`1950:${year}`);
			}
			if (this.options){
				_.forEach(this.options,function(value,key){
					$(self.$el).datepicker("option",key,value);
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
</style>
