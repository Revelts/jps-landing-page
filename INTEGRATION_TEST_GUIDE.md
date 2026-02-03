# 🧪 Weekly Schedule Integration - Testing Guide

## ✅ Quick Test Steps

### **Test 1: Add Events as Admin**

1. **Login as Admin**

   ```
   Go to: /login
   Use admin credentials
   ```

2. **Navigate to Weekly Schedule Manager**

   ```
   Click: Dashboard → Weekly Schedule
   URL: /dashboard/weekly-schedule
   ```

3. **Add Test Events**

   ```
   Event 1:
   - Date: [Select today or tomorrow]
   - Venue: Noya Bar
   - Artist: DJ Test Alpha
   - Address: Jl. Kemang Raya No. 123, Jakarta
   - Genres: House, Techno, EDM

   Click "+ Add Another Event"

   Event 2:
   - Date: [Same date as Event 1]
   - Venue: Bengkel Bar
   - Artist: DJ Test Beta
   - Address: Jl. SCBD No. 456, Jakarta
   - Genres: Hip Hop, R&B
   ```

4. **Save Events**
   ```
   Click: "Save Events" button
   Expected: ✅ Green success message
   ```

---

### **Test 2: View on Public Page**

1. **Open Public Schedule**

   ```
   Go to: /schedule
   No login required
   ```

2. **Check Display**

   ```
   ✓ Events should appear on correct day
   ✓ Venue names visible
   ✓ Artist names visible
   ✓ Address visible
   ✓ Genre badges visible (up to 2 + "+" badge)
   ```

3. **Test Navigation**

   ```
   Click: Next Week button
   ✓ Date range updates
   ✓ Events update (if any)

   Click: Previous Week button
   ✓ Back to current week
   ✓ Your test events visible
   ```

4. **Check Quick Stats**
   ```
   Bottom of page should show:
   ✓ Total Events: [Your count]
   ✓ Venues: [Unique venue count]
   ✓ Artists: [Unique artist count]
   ✓ Today: [Events for selected day]
   ```

---

### **Test 3: Empty State**

1. **Navigate to next week (if no events)**
   ```
   ✓ Should show "No Events Scheduled" card
   ✓ Calendar icon visible
   ✓ Message: "Check back later..."
   ```

---

### **Test 4: Multiple Genres**

1. **Add event with 3+ genres**

   ```
   Admin Dashboard → Add Event
   Genres: House, Techno, EDM, Trance
   ```

2. **Check Public Page**
   ```
   ✓ First 2 genres show as badges
   ✓ "+2" badge appears
   ✓ All genres stored in database
   ```

---

## 🔍 What to Look For

### ✅ **Success Indicators:**

- [ ] Events saved successfully (admin)
- [ ] Events appear on public page
- [ ] Correct date/day grouping
- [ ] All data fields visible
- [ ] Genre badges display correctly
- [ ] Week navigation works
- [ ] Quick stats update
- [ ] Loading spinner appears briefly
- [ ] No console errors

### ❌ **Potential Issues:**

- [ ] Events not appearing → Check database connection
- [ ] Wrong day → Check date calculation
- [ ] Missing data → Check API response
- [ ] Slow loading → Check network tab
- [ ] Console errors → Check browser console

---

## 🎯 Expected Results

### **Admin Side:**

```
POST /api/admin/schedule → 200 OK
Response: { success: true, message: "Successfully created X event(s)" }
```

### **Public Side:**

```
GET /api/schedule?startDate=...&endDate=... → 200 OK
Response: { success: true, data: [...], count: X }
```

### **Database:**

```sql
SELECT * FROM weekly_schedule;
-- Should show your test events
```

---

## 🐛 Troubleshooting

### **Events not showing:**

1. Check admin saved successfully
2. Check database has records
3. Check API endpoint returns data
4. Check date range matches
5. Check browser console for errors

### **Wrong date/day:**

1. Verify event_date in database
2. Check timezone settings
3. Verify week calculation logic

### **Genres not showing:**

1. Check genres array in database
2. Verify API returns genres
3. Check component maps genres correctly

---

## ✅ Checklist

- [ ] Admin can add events
- [ ] Events save to database
- [ ] Public page shows events
- [ ] Correct day grouping
- [ ] Genre badges work
- [ ] Week navigation works
- [ ] Stats calculate correctly
- [ ] Loading state shows
- [ ] Empty state shows (if no events)
- [ ] No console errors

---

## 🎉 Success!

If all checks pass:
✅ Integration is working correctly!
✅ Admin can manage schedule
✅ Public can view schedule
✅ Real-time data flow working

**System is production-ready!** 🚀
