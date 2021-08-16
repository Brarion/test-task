<template>
	<v-row>
		<v-col>
			<div class="btnWrapper">
				<v-btn @click="createStaff">Добавить</v-btn>
			</div>
			<StaffList :staff="staffWithInitials" :staff-selected="staffSelected" />
		</v-col>
		<v-col>
			<StaffForm v-if="selectedStaff" :staff="selectedStaff" :save-staff="saveStaff"
					   :remove-staff="removeStaff" />
		</v-col>
	</v-row>
</template>

<script>
import StaffList from "../components/StaffList"
import StaffForm from "../components/StaffForm"

import { nanoid } from "nanoid"
import moment from "moment"
import { map } from "lodash"

export default {
	name: "Staff",

	components: {
		StaffList, StaffForm
	}, data() {
		return {
			staff: JSON.parse(localStorage.getItem("empStore")) || [], selectedStaff: null
		}
	}, computed: {
		staffWithInitials: function() {
			return map(this.staff, s => ({
				id: s.id, fio: s.fio
								.split(" ")
								.map((item, index) => index === 0 ? `${item[0].toUpperCase()}${item.slice(1)}` : `${item[0].toUpperCase()}.`)
								.join(" ")
			}))
		}
	}, methods: {
		staffSelected(staff) {
			const selectedStaff = JSON.parse(localStorage.getItem("empStore")).find(item => item.id === staff.id)
			this.selectedStaff = { ...selectedStaff, pass_dt: moment(selectedStaff.pass_dt).format("YYYY-MM-DD") }
		}, createStaff() {
			this.selectedStaff = {
				id: null, fio: "", pass_ser: "", pass_no: "", pass_dt: ""
			}
		}, saveStaff(staff) {
			const empStore = JSON.parse(localStorage.getItem("empStore"))
			let newEmpStore = empStore
			if (empStore) {
				const indexOfCurrentStaffInStorage = empStore.findIndex(item => item.id === staff.id)
				if (indexOfCurrentStaffInStorage >= 0) {
					empStore[indexOfCurrentStaffInStorage] = { ...staff }
					newEmpStore = [...empStore]
				} else {
					newEmpStore = [...empStore, {
						...staff, id: nanoid()
					}]
				}
			} else {
				newEmpStore = [{
					...staff, id: nanoid()
				}]
			}
			localStorage.setItem("empStore", JSON.stringify(newEmpStore))

			this.staff = newEmpStore
			this.selectedStaff = { ...staff, pass_dt: moment(staff.pass_dt).format("YYYY-MM-DD") }
		}, removeStaff(staffId) {
			const empStore = JSON.parse(localStorage.getItem("empStore"))
			if (empStore) {
				const newEmpStore = empStore.filter(item => item.id !== staffId)
				localStorage.setItem("empStore", JSON.stringify(newEmpStore))

				this.staff = newEmpStore
				this.selectedStaff = null
			}
		}
	}
}
</script>

<style scoped>
.btnWrapper {
	display: flex;
	justify-content: center;
}
</style>
