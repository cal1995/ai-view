<template>
	<div class="form-wrapper">
		<Form
		ref="scoreCardForm"
		:model="scoreCardForm"
		:rules="scoreRules"
		:label-width="140"
		>
			<FormItem
			label="影响因子"
			prop="case_name"
			>
				<Input
				v-model.trim="scoreCardForm.case_name"
				style="width: 400px"
				clearable
				></Input>
			</FormItem>
			<FormItem
			label="关联模型"
			prop="type"
			>
				<Select
				v-model.trim="scoreCardForm.type"
				style="width: 400px"
				clearable
				>
					<Option
					:value="item.value"
					:key="item.value"
					v-for="item in contextList"
					>
						{{ item.label }}
					</Option>
				</Select>
			</FormItem>
			<FormItem
			label="取值"
			prop="caseScore"
			>
				<div

				v-for="(item, index) in scoreCardForm.caseScore"
				:key="index"
				>
					<Form
					:ref="`caseScoreForm-${index}`"
					:rules="rules"
					:model="item"
					:key="`caseScoreForm-${index}`"
					inline-form
					>
						<Row
						type="flex"
						align="middle"
						>
							<div v-if="item.startSym !== '=' || item.endSym !== '='">
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
											<template #prepend>
												<Select
												v-model="item.startSym"
												style="width: 42px"
												@on-change="changeStartSym(item.startSym, item)"

												plcaeholder=""
												>
													<Option
													:value="symbolItem.value"
													:key="symbolItem.value"
													v-for="symbolItem in prevSymbol"
													>
														{{ symbolItem.label }}
													</Option>
												</Select>
											</template>
										</Input>
									</FormItem>
								</i-col>
							</div>
							<!-- <i-col class="item-input">
								-
							</i-col> -->
							<i-col
							class="item-input"
							>
								<FormItem
								prop="end"
								:rules="item.startSym !== '=' ? end : modelValue"
								>
									<Input
									style="width: 140px;"
									:class="item.startSym !== '=' ? 'align-right' : ''"
									v-model.trim="item.end"
									>
										<template #append>
											<Select
											v-model="item.endSym"
											style="width: 42px"
											@on-change="changeEndSym(item.startSym, item)"
											plcaeholder=""
											>
												<Option
												:value="symbolItem.value"
												:key="symbolItem.value"
												v-for="symbolItem in nextSymbol"
												>
													{{ symbolItem.label }}
												</Option>
											</Select>
										</template>
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
				</div>
				<div v-if="scoreCardForm.caseScore.length == 0">
					<Button
					icon="md-add"
					type="dashed"
					@click="addRow"
					></Button>
				</div>
			</FormItem>
			<FormItem
			label="阈值分数"
			prop="threshold"
			>
				<Input
				v-model.trim="scoreCardForm.threshold"
				style="width: 400px"
				clearable
				>
				</Input>
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
/* eslint-disable */
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
    const validateValue = (rule, value, callback) => {
      console.log('value', value);
      const reg = /^-?\d+(?:\.\d+)?$/;
      if (!reg.test(value)) {
        const errorText = '请输入正数或者负数';
        callback(new Error(errorText));
      } else {
        callback();
      }
    };
    return {
      scoreCardForm: {
        case_name: '',
        type: '',
        typeName: '',
        caseScore: [],
        threshold: ''
      },
      scoreRules: {
        case_name: [{ required: true, message: '请输入影响因子', type: 'string', trigger: 'change' }],
        type: [{ required: true, message: '请选择关联模型', type: 'string', trigger: 'change' }],
        caseScore: [
          { required: true, validator: validateCaseScore, trigger: 'change' }
        ],
        threshold: [
          { required: true, message: '请输入阈值分数', type: 'string', trigger: 'change' }
        ]
      },
      rules: {
        start: [
          { required: true, message: '请输入区间范围', type: 'string', trigger: 'change' },
          { validator: validateValue }
        ],
        score: [
          { required: true, message: '请输入分数', type: 'string', trigger: 'change' }
        ]
      },
			end: [
        { required: true, message: '请输入区间范围', type: 'string', trigger: 'change' },
        { validator: validateValue},
      ],
      modelValue: [
        { required: true, message: '请输入模型值', type: 'string', trigger: 'change' },
      ],
      contextList: [
        {
          label: '特征表',
          value: '1'
        },
        {
          label: '规则模型',
          value: '2'
        },
        {
          label: '机器学习模型',
          value: '3'
        }
      ],
      prevSymbol: [
        {
          label: '[',
          value: '['
        },
        {
          label: '(',
          value: '('
        },
        {
          label: '=',
          value: '='
        }
      ],
      nextSymbol: [
        {
          label: ']',
          value: ']'
        },
        {
          label: ')',
          value: ')'
        },
        {
          label: '=',
          value: '='
        }
      ]
    };
  },
  methods: {
    addRow() {
      const row = {
        startSym: '[',
        start: '',
        end: '',
        endSym: ')',
        score: ''
      };
      this.scoreCardForm.caseScore.push(row);
    },
    removeRow(index) {
      this.scoreCardForm.caseScore.splice(index, 1);
    },
    changeStartSym(val, item) {
      if (val === '=') {
        item.endSym = '=';
        item.start = '';
      }
    },
    changeEndSym(val, item) {
      if (val === '=') {
        item.startSym = '=';
        item.start = '';
      } else {
        item.startSym = '[';
      }
    },
    submitModel() {
      // console.log(this.scoreCardForm);
      this.$refs.scoreCardForm.validate((valid) => {
        // console.log(valid);
      });
      const { caseScore } = this.scoreCardForm;
      console.log(caseScore);
      caseScore.forEach((item, index) => {
        const name = `caseScoreForm-${index}`;
        this.$refs[name][0].validate((valid) => {
          console.log(valid);
        });
      });
    }
  }
};
</script>

<style lang="scss">
// .item-input {
//   .ivu-form-item-error .ivu-input{
//     border: 1px solid #dcdee2;
//   }

//   .ivu-input-group-prepend,
//    .ivu-input-group>.ivu-input:first-child,
//     .ivu-input-group>span>.ivu-input:first-child {
//       border-bottom-right-radius: 0!important;
//     border-top-right-radius: 0!important;
//     }
//   .ivu-form-item-error .ivu-input-group-append,
//   .ivu-form-item-error .ivu-input-group-prepend {
//     background-color: #f8f8f9;
//     border: 1px solid #dcdee2;
//     border-right: 0;
//   }
// }

</style>
<style lang="scss" scoped>
.form-wrapper {
	width: 720px;
	margin: 0 auto;
	text-align: left;
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
