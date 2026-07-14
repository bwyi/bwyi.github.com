tell application "Calendar"
	set targetCalendar to calendar "个人"
	set eventTitle to "妈妈生日（农历六月十五）"
	set datePairs to {¬
		{"Tuesday, July 28, 2026 at 00:00:00", "Wednesday, July 29, 2026 at 00:00:00"}, ¬
		{"Sunday, July 18, 2027 at 00:00:00", "Monday, July 19, 2027 at 00:00:00"}, ¬
		{"Saturday, August 5, 2028 at 00:00:00", "Sunday, August 6, 2028 at 00:00:00"}, ¬
		{"Wednesday, July 25, 2029 at 00:00:00", "Thursday, July 26, 2029 at 00:00:00"}, ¬
		{"Monday, July 15, 2030 at 00:00:00", "Tuesday, July 16, 2030 at 00:00:00"}, ¬
		{"Saturday, August 2, 2031 at 00:00:00", "Sunday, August 3, 2031 at 00:00:00"}, ¬
		{"Wednesday, July 21, 2032 at 00:00:00", "Thursday, July 22, 2032 at 00:00:00"}, ¬
		{"Monday, July 11, 2033 at 00:00:00", "Tuesday, July 12, 2033 at 00:00:00"}, ¬
		{"Sunday, July 30, 2034 at 00:00:00", "Monday, July 31, 2034 at 00:00:00"}, ¬
		{"Thursday, July 19, 2035 at 00:00:00", "Friday, July 20, 2035 at 00:00:00"}, ¬
		{"Tuesday, July 8, 2036 at 00:00:00", "Wednesday, July 9, 2036 at 00:00:00"}, ¬
		{"Monday, July 27, 2037 at 00:00:00", "Tuesday, July 28, 2037 at 00:00:00"}, ¬
		{"Friday, July 16, 2038 at 00:00:00", "Saturday, July 17, 2038 at 00:00:00"}, ¬
		{"Thursday, August 4, 2039 at 00:00:00", "Friday, August 5, 2039 at 00:00:00"}, ¬
		{"Monday, July 23, 2040 at 00:00:00", "Tuesday, July 24, 2040 at 00:00:00"}, ¬
		{"Friday, July 12, 2041 at 00:00:00", "Saturday, July 13, 2041 at 00:00:00"}, ¬
		{"Thursday, July 31, 2042 at 00:00:00", "Friday, August 1, 2042 at 00:00:00"}, ¬
		{"Tuesday, July 21, 2043 at 00:00:00", "Wednesday, July 22, 2043 at 00:00:00"}, ¬
		{"Saturday, July 9, 2044 at 00:00:00", "Sunday, July 10, 2044 at 00:00:00"}, ¬
		{"Friday, July 28, 2045 at 00:00:00", "Saturday, July 29, 2045 at 00:00:00"} ¬
	}
	set createdCount to 0
	set existingCount to 0
	repeat with datePair in datePairs
		set birthdayStart to my dateFromText(item 1 of datePair)
		set birthdayEnd to my dateFromText(item 2 of datePair)
		set matchingEvents to every event of targetCalendar whose summary is eventTitle and start date is birthdayStart
		if (count of matchingEvents) is 0 then
			make new event at end of events of targetCalendar with properties {summary:eventTitle, start date:birthdayStart, end date:birthdayEnd, allday event:true, description:"农历六月十五"}
			set createdCount to createdCount + 1
		else
			set existingCount to existingCount + 1
		end if
	end repeat
	return "CREATED " & createdCount & ", EXISTS " & existingCount
end tell

on dateFromText(dateText)
	return date dateText
end dateFromText
