<template>
	<div style="width: 700px; margin: 0 auto;">
		<div
		v-for="(value, key) in infos.formValidate"
		:key="key"
		>
			<div
			v-for="(item, index) in value"
			:key="index"
			>
				<Form
				:ref="'formValidate' + key + index"
				:model="item"
				:rules="infos.ruleValidate"
				:label-width="80"
				>
					<FormItem
					label="Name"
					prop="name"
					>
						<Input
						v-model="item.name"
						placeholder="Enter your name"
						></Input>
					</FormItem>
					<FormItem
					label="E-mail"
					prop="mail"
					>
						<Input
						v-model="item.mail"
						placeholder="Enter your e-mail"
						></Input>
					</FormItem>
				</Form>
			</div>
		</div>
		<Button
		type="primary"
		@click.native="handleSubmit()"
		>
			Submit
		</Button>
		<Button
		@click.native="handleReset()"
		style="margin-left: 8px"
		>
			Reset
		</Button>
	</div>
</template>
<script>
export default {
  data() {
    return {
      infos: {
        formValidate: [
          [
            {
              name: '',
              mail: ''
            }
          ],
          [
            {
              name: '',
              mail: ''
            }
          ]
        ],
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', type: 'string', trigger: 'blur' }
          ],
          mail: [
            // { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
            { required: true, message: 'Mailbox cannot be empty', type: 'string', trigger: 'blur' }
          ]
        }
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.$refs);
      const arr = [];
      this.infos.formValidate.forEach((item, index) => {
        item.forEach((data, key) => {
          const form = `formValidate${index}${key}`;
          this.$refs[form][0].validate((valid) => {
            if (valid) {
              arr.push(true);
            } else {
              arr.push(false);
            }
          });
        });
      });
      const flag = arr.every(item => item === true);
      if (flag) {
        this.$Message.success('success');
      } else {
        this.$Message.error('filed');
      }
    },
    handleReset() {
      this.infos.formValidate.forEach((item, index) => {
        item.forEach((data, key) => {
          const form = `formValidate${index}${key}`;
          this.$refs[form][0].resetFields();
        });
      });
    }
  }
};
</script>
