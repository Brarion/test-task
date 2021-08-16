<template>
	<v-form ref="form" v-model="valid">
		<v-text-field
			v-model="form.fio"
			label="ФИО сотрудника"
			required
			:rules="rules.fio"
		></v-text-field>
		<v-text-field
			v-model="form.pass_ser"
			type="number"
			label="Серия паспорта"
			required
			:rules="rules.pass_ser"
		></v-text-field>
		<v-text-field
			v-model="form.pass_no"
			type="number"
			label="Номер паспорта"
			required
			:rules="rules.pass_no"
		></v-text-field>
		<v-text-field
			v-model="form.pass_dt"
			label="Дата выдачи паспорта"
			required
			type="date"
			:rules="rules.pass_dt"
		></v-text-field>
		<div class="btnWrapper">
			<v-btn v-if="saveVisible" :disabled="!valid" @click="save">Сохранить</v-btn>
			<v-btn v-if="this.$props.staff.id" @click="remove">Удалить</v-btn>
		</div>
	</v-form>
</template>

<script>
import moment from "moment"

export default {
	name: "StaffForm", props: {
		staff: Object, removeStaff: Function, saveStaff: Function
	}, data() {
		return {
			form: {
				fio: this.$props.staff.fio || "",
				pass_ser: this.$props.staff.pass_ser || "",
				pass_no: this.$props.staff.pass_no || "",
				pass_dt: this.$props.staff.pass_dt || ""
			}, rules: {
				fio: [fio => !!fio || "Обязательное поле", fio => (fio && fio.trim().split(" ").length >= 2 && fio.trim().split(" ").length <= 3) || "Фамилия и имя должны быть заполнены полностью"],
				pass_ser: [pass_ser => !!pass_ser || "Обязательное поле", pass_ser => (pass_ser && pass_ser.length === 4) || "Должно быть 4 цифры"],
				pass_no: [pass_no => !!pass_no || "Обязательное поле", pass_no => (pass_no && pass_no.length === 6) || "Должно быть 6 цифр"],
				pass_dt: [pass_dt => !!pass_dt || "Обязательное поле"]
			}, valid: false
		}
	}, computed: {
		saveVisible: function() {
			return this.$props.staff.id ? JSON.stringify({
				fio: this.$props.staff.fio,
				pass_ser: this.$props.staff.pass_ser,
				pass_no: this.$props.staff.pass_no,
				pass_dt: this.$props.staff.pass_dt
			}) !== JSON.stringify(this.form) : JSON.stringify({
				fio: "", pass_ser: "", pass_no: "", pass_dt: ""
			}) !== JSON.stringify(this.form)
		}
	}, methods: {
		save() {
			if (this.$props.staff.id) {
				this.$props.saveStaff({
					...this.form, pass_dt: moment(this.form.pass_dt).toISOString(), id: this.$props.staff.id
				})
			} else {
				this.$props.saveStaff({ ...this.form, pass_dt: moment(this.form.pass_dt).toISOString() })
			}
		}, remove() {
			this.$props.removeStaff(this.$props.staff.id)
		}, setForm(form) {
			delete form.id
			this.form = { ...form }
		}
	}, watch: {
		staff: function(val, oldVal) {
			if (val.id !== oldVal.id) {
				this.setForm({
					id: val.id, fio: val.fio, pass_ser: val.pass_ser, pass_no: val.pass_no, pass_dt: val.pass_dt
				})
			}
		}

	}
}
</script>

<style scoped>
.btnWrapper {
	display: flex;
	justify-content: space-around;
}
</style>
