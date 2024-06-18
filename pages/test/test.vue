<template>
	<view class="test">
		<radio-group name="radio">
			<label>
				<radio :value="parents" /><text></text>
			</label>
			<label>
				<radio :value="students" /><text></text>
			</label>
		</radio-group>
	</view>
</template>

<script>
export default {
  data() {
    return {
		parents:'1',
		students:'2',
    };
  },
  onLoad() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      // 假设通过接口获取学生数据
      uni.request({
        url: 'https://api/student/showStudent',
        method: 'POST',
        success: (res) => {
          this.students = res.data.students.map(student => ({
            ...student,
            checked: false,
          }));
        },
      });
    },
    updateSex(index, event) {
      const value = event.detail.value;
      this.$set(this.students[index], 'sex', this.sexOptions[value]);
    },
    updateNewStudentSex(event) {
      const value = event.detail.value;
      this.newStudent.sex = this.sexOptions[value];
    },
    addStudent() {
      if (!this.newStudent.name || this.newStudent.sex === '性别') {
        uni.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }
      this.students.push({ ...this.newStudent, checked: false });
      this.newStudent = { name: '', sex: '性别' };
    },
    submitStudents() {
      const studentData = this.students.map(({ name, sex }) => ({ name, sex }));
      uni.request({
        url: 'https://api/student/submitStudents',
        method: 'POST',
        data: JSON.stringify(studentData),
        header: {
          'Content-Type': 'application/json',
        },
        success: (res) => {
          uni.showToast({ title: '提交成功', icon: 'success' });
        },
      });
    },
    deleteSelectedStudents() {
      this.students = this.students.filter(student => !student.checked);
    },
  },
};
</script>

<style>
.container {
  padding: 20px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-name,
.input-sex {
  flex: 1;
  margin-right: 10px;
}

.add-btn,
.submit-btn,
.delete-btn {
  background-color: #1CB1F6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.add-btn {
  margin-left: 10px;
}

.show {
  flex: 1;
  margin-right: 10px;
}

.picker {
  flex: 1;
}
</style>
