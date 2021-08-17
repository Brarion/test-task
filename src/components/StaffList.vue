<template>
	<v-data-table :headers="headers" :items="staff" hide-default-footer @click:row="staffSelected"> </v-data-table>
</template>

<script>
export default {
	name: "StaffList",
	props: {
		staff: Array,
		staffSelected: Function
	},
	data() {
		return {
			headers: [
				{
					text: "ФИО сотрудника",
					align: "center",
					sortable: false,
					value: "fio"
				}
			]
		}
	}
}
</script>
