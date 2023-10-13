import React from 'react'
import GroupingTable from '../GroupingTable/NotificationsTable'
import InquiriesTable from '../GroupingTable/InquiriesTable'

export default function Inquiries() {
  return (
    <div>
        <h2 style={{marginBottom: "25px"}}>문의</h2>
        <InquiriesTable />
    </div>
  )
}
