<template>
	<v-row>
		<v-col>
			<div class="btnWrapper">
				<v-btn @click="createStaff">Добавить</v-btn>
			</div>
			<StaffList :staff="staffWithInitials" :staff-selected="staffSelected" />
		</v-col>
		<v-col>

		</v-col>
	</v-row>
</template>

<script>
import StaffList from "../components/StaffList"
import { map } from "lodash"

export default {
	name: "Staff",

	components: {
		StaffList
	}, data() {
		return {
			staff: [], selectedStaff: null
		}
	}, computed: {
		staffWithInitials: function() {
			return map(this.staff, s => ({
				id: s.id,
				fio: s.fio.split(" ").map((item, index) => index === 0 ? item : `${item[0].toUpperCase()}.`).join(" ")
			}))
		}
	}, methods: {
		staffSelected(staff) {
			this.selectedStaff = staff
		}, createStaff() {
			this.selectedStaff = {
				fio: "", pass_ser: "", pass_no: "", pass_dt: ""
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
