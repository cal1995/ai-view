<template>
	<div class="form-wrapper">
		<Form
		ref="scoreCardForm"
		:rules="rules"
		:model="scoreCardForm"
		:label-width="100"
		>
			<FormItem
			label="取值"
			prop="caseScore"
			>
				<Row
				class="input-row"
				v-for="(item, index) in scoreCardForm.caseScore"
				:key="item.id"
				>
					<Form
					:ref="`caseScoreForm-${item.id}`"
					:rules="scoreRules"
					:model="item"
					:key="`caseScoreForm-${item.id}`"
					inline-form
					>
						<Row
						type="flex"
						align="middle"
						>
							<i-col
							class="item-input"
							>
								<FormItem
								prop="start"
								>
									<Input
									style="width: 140px"
									v-model.trim="item.start"
									>
									</Input>
								</FormItem>
							</i-col>
							<!-- <i-col class="item-input">
								-
							</i-col> -->
							<i-col
							class="item-input"
							>
								<FormItem prop="end">
									<Input
									style="width: 140px;"
									v-model.trim="item.end"
									>
									</Input>
								</FormItem>
							</i-col>
							<i-col
							class="item-input"
							>
								<FormItem prop="score">
									<Input
									style="width: 78px"
									placeholder="分数"
									v-model.trim="item.score"
									clearable
									></Input>
								</FormItem>
							</i-col>
							<i-col class="item-input">
								<Button
								icon="md-remove"
								type="dashed"
								style="margin-right: 6px"
								@click="removeRow(index)"
								></Button>
								<Button
								v-if="index === scoreCardForm.caseScore.length - 1"

								icon="md-add"
								@click="addRow"
								type="dashed"
								></Button>
							</i-col>
						</Row>
					</Form>
				</Row>
				<div v-if="scoreCardForm.caseScore.length == 0">
					<Button
					icon="md-add"
					type="dashed"
					@click="addRow"
					></Button>
				</div>
			</FormItem>
		</Form>
		<div style="text-align: center">
			<Button
			type="primary"
			@click="submitModel"
			>
				提交
			</Button>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    const validateCaseScore = (rule, value, callback) => {
      // eslint-disable-next-line camelcase
      const { caseScore } = this.scoreCardForm;
      if (caseScore.length === 0) {
        callback(new Error('请输入取值和分数'));
      } else {
        callback();
      }
    };
    return {
      scoreCardForm: {
        caseScore: []
      },
      rules: {
        caseScore: [
          { required: true, validator: validateCaseScore, trigger: 'change' }
        ]
      },
      scoreRules: {
        start: [
          { required: true, message: 'start', type: 'string', trigger: 'change' }
        ],
        end: [
          { required: true, message: 'end', type: 'string', trigger: 'change' }
        ],
        score: [
          { required: true, message: 'score', type: 'string', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    addRow() {
      const row = {
        id: `${new Date().getTime()}`,
        start: '',
        end: '',
        score: ''
      };
      this.scoreCardForm.caseScore.push(row);
    },
    removeRow(index) {
      this.scoreCardForm.caseScore.splice(index, 1);
    },
    submitModel() {
      console.log(this.$refs.scoreCardForm)
      this.$refs.scoreCardForm.validate((valid) => {
        // console.log(valid);
      });
      const { caseScore } = this.scoreCardForm;
      caseScore.forEach((item) => {
        const name = `caseScoreForm-${item.id}`;
        this.$refs[name][0].validate((valid) => {
          console.log(valid);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
	width: 720px;
	margin: 0 auto;
	text-align: left;
}
.input-row {
  margin-bottom: 20px;
}
.item-input {
    margin: 5px 10px;
}
.item-input:first-child {
    margin-left: 0;
}
.item-input:last-child{
    text-align: right;
}
</style>
