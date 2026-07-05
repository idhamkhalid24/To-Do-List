// FCM Token Retrieval (Global)
let currentFcmToken = null;
window.terimaTokenFCM = function(token) {
    currentFcmToken = token;
    console.log("FCM Token retrieved:", token);
};
if (window.Android && window.Android.getFcmToken) {
    window.Android.getFcmToken("terimaTokenFCM");
}

    // ============================================================
    // Supabase
    // ============================================================
    const supabaseUrl = 'https://phuzgriglgovzcwgbehr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodXpncmlnbGdvdnpjd2diZWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTQ3ODUsImV4cCI6MjA5NDE3MDc4NX0.gf-cfo8Vos8uYgZRHG0KUB4xMhXAld2oTYv-wNiKneE';
    
    let supabaseClient;
    try {
        if (window.supabase) {
            supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        } else {
            console.error('Library Supabase tidak ditemukan.');
            alert('Library Supabase gagal dimuat. Pastikan ada koneksi internet.');
        }
    } catch (e) {
        console.error('Error inisialisasi Supabase:', e);
        alert('Gagal inisialisasi Supabase: ' + e.message);
    }

    async function getAllTasks() {
        if (!supabaseClient) return [];
        try {
            const { data, error } = await supabaseClient.from('tasks').select('*');
            if (error) {
                console.error('Error fetching tasks:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('Exception fetching tasks:', e);
            return [];
        }
    }

    async function putTask(task) {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('tasks').upsert(task);
            if (error) {
                console.error('Error saving task:', error);
                alert('Gagal menyimpan tugas ke database. Cek console.');
            }
        } catch (e) {
            console.error('Exception saving task:', e);
        }
    }

    async function deleteTaskFromDB(taskId) {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('tasks').delete().eq('id', taskId);
            if (error) {
                console.error('Error deleting task:', error);
            }
        } catch (e) {
            console.error('Exception deleting task:', e);
        }
    }

    async function clearAllTasksFromDB() {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('tasks').delete().neq('id', '0');
            if (error) {
                console.error('Error clearing tasks:', error);
            }
        } catch (e) {
            console.error('Exception clearing tasks:', e);
        }
    }


    // ============================================================
    // i18n — Sistem Bahasa Indonesia / English
    // ============================================================
    const LANG = {
        id: {
            appName: 'Tugas Saya',
            sortBy: 'Urutkan',
            byTime: 'Per Jam',
            deadline: 'Tanggal',
            priority: 'Prioritas',
            searchPlaceholder: 'Cari tugas...',
            allTasks: 'Jadwal Hari Ini',
            active: 'Semua Tugas',
            sortDefault: 'Default',
            byCategory: 'Per Kategori',
            completed: 'Selesai',
            noTasks: 'Belum ada tugas',
            noTasksHint: 'Ketuk tombol + untuk mulai!',
            noCompletedTasks: 'Belum ada tugas yang selesai',
            noCompletedTasksHint: 'Tugas yang diselesaikan akan muncul di sini.',
            taskTitle: 'Judul Tugas*',
            briefDetails: 'Detail Singkat (Opsional)',
            briefPlaceholder: 'Tambahan info tentang tugas ini...',
            category: 'Kategori',
            categoryPlaceholder: 'cth. Kerja, Pribadi',
            timeLabel: 'Jam (Opsional)',
            useTime: ' Pakai Jam',
            addTask: 'Tambah Tugas',
            cancel: 'Batal',
            revisionNote: 'Catatan Revisi (Opsional)',
            revisionPlaceholder: 'Apa yang diubah dan kenapa?',
            saveChanges: 'Simpan',
            settings: 'Pengaturan',
            theme: 'Tema',
            language: 'Bahasa',
            export: 'Ekspor',
            exportBtn: 'Ekspor Semua (.txt)',
            data: 'Data',
            clearAll: 'Hapus Semua',
            storageNote: 'Data tersimpan lokal di perangkat ini.<br>Tidak perlu akun atau internet.',
            niceJob: 'Bagus! 🎉',
            offlineLabel: '100% Offline',
            high: 'Tinggi',
            medium: 'Sedang',
            low: 'Rendah',
            noDeadline: 'Tanpa tanggal',
            overdueLabel: '⚠ Terlambat',
            revisionHistoryLabel: 'Riwayat Revisi:',
            uncategorized: 'Tanpa Kategori',
            habitsTitle: 'Rutinitas Harian',
            deleteConfirm: 'Hapus tugas ini?',
            clearConfirm: 'Hapus semua tugas? Ini tidak bisa dibatalkan.',
            noExport: 'Tidak ada tugas untuk diekspor.',
            noTitleAlert: 'Mohon isi judul tugas.',
            exportHeaderTitle: 'Daftar Tugas Saya',
            exportGenerated: 'Dibuat',
            exportTotal: 'Total',
            exportStatus: 'Status',
            exportDone: 'Selesai',
            exportPending: 'Belum selesai',
            exportCategory: 'Kategori',
            exportPriority: 'Prioritas',
            exportDeadline: 'Tanggal',
            exportDetails: 'Detail',
            exportRevisions: 'Revisi',
            exportOverdue: '(Terlambat)',
        },
        en: {
            appName: 'My Tasks',
            sortBy: 'Sort By',
            byTime: 'By Hour',
            deadline: 'Deadline',
            priority: 'Priority',
            searchPlaceholder: 'Search tasks...',
            allTasks: 'Today\'s Schedule',
            active: 'All Tasks',
            sortDefault: 'Default',
            byCategory: 'By Category',
            completed: 'Completed',
            noTasks: 'No tasks found',
            noTasksHint: 'Tap the + button to get started!',
            noCompletedTasks: 'No completed tasks yet',
            noCompletedTasksHint: 'Tasks you complete will appear here.',
            taskTitle: 'Task Title*',
            briefDetails: 'Brief Details (Optional)',
            briefPlaceholder: 'Any additional details about this task...',
            category: 'Category',
            categoryPlaceholder: 'e.g., Work, Personal',
            timeLabel: 'Time (Optional)',
            useTime: ' Use Time',
            addTask: 'Add Task',
            cancel: 'Cancel',
            revisionNote: 'Revision Note (Optional)',
            revisionPlaceholder: 'What changes are you making and why?',
            saveChanges: 'Save Changes',
            settings: 'Settings',
            theme: 'Theme',
            language: 'Language',
            export: 'Export',
            exportBtn: 'Export All Tasks (.txt)',
            data: 'Data',
            clearAll: 'Clear All Tasks',
            storageNote: 'Data is stored locally on this device.<br>No account or internet needed.',
            niceJob: 'Nice job! 🎉',
            offlineLabel: '100% Offline',
            high: 'High',
            medium: 'Medium',
            low: 'Low',
            noDeadline: 'No deadline',
            overdueLabel: '⚠ Overdue',
            revisionHistoryLabel: 'Revision History:',
            uncategorized: 'Uncategorized',
            habitsTitle: 'Daily Habits',
            deleteConfirm: 'Delete this task?',
            clearConfirm: 'Clear all tasks? This cannot be undone.',
            noExport: 'No tasks to export.',
            noTitleAlert: 'Please enter a task title.',
            exportHeaderTitle: 'My Task List',
            exportGenerated: 'Generated',
            exportTotal: 'Total',
            exportStatus: 'Status',
            exportDone: 'Completed',
            exportPending: 'Pending',
            exportCategory: 'Category',
            exportPriority: 'Priority',
            exportDeadline: 'Deadline',
            exportDetails: 'Details',
            exportRevisions: 'Revisions',
            exportOverdue: '(Overdue)',
        }
    };

    let currentLang = localStorage.getItem('todo_lang') || 'id';

    function t(key) {
        return (LANG[currentLang] && LANG[currentLang][key]) || (LANG['en'][key]) || key;
    }

    function applyLang() {
        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = t(key);
        });
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });
        // Update lang toggle button
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.textContent = currentLang === 'id' ? '🇬🇧 EN' : '🇮🇩 ID';
        // Update document title
        document.title = 'Dailish — ' + t('appName');
        // Update priority select options (they use value, not data-i18n target well enough for select)
        document.querySelectorAll('option[data-i18n]').forEach(opt => {
            opt.textContent = t(opt.getAttribute('data-i18n'));
        });
    }

    function switchLang() {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('todo_lang', currentLang);
        applyLang();
    }

    // ============================================================
    // App State
    // ============================================================
    let tasks = [];
    let allCategories = [];
    let currentEditingTask = null;
    let currentFilter = 'all';
    let currentSort = 'filter';
    let currentActiveSort = 'default';
    let currentSearch = '';

    // ============================================================
    // Utils
    // ============================================================
    function getLocalDateStr(d = new Date()) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatDate(deadlineStr) {
        if (!deadlineStr) return t('noDeadline');
        try {
            // deadlineStr bisa "2026-06-30" atau "2026-06-30T23:00"
            const hasTime = deadlineStr.includes('T') && deadlineStr.length > 10;
            const dt = hasTime ? new Date(deadlineStr) : new Date(deadlineStr + 'T00:00:00');
            const dateOpts = { weekday: 'short', month: 'short', day: 'numeric' };
            const datePart = dt.toLocaleDateString('en-US', dateOpts);
            if (hasTime) {
                const timePart = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                return `${datePart}, ${timePart}`;
            }
            return datePart;
        } catch { return deadlineStr; }
    }

    function getTimeFromDeadline(deadlineStr) {
        if (!deadlineStr || !deadlineStr.includes('T') || deadlineStr.length <= 10) return null;
        try {
            return deadlineStr.split('T')[1];
        } catch { return null; }
    }

    function formatTimeHeader(timeStr) {
        if (!timeStr) return 'Tanpa Jam';
        try {
            const [hours, minutes] = timeStr.split(':');
            return `${hours}:${minutes}`;
        } catch { return timeStr; }
    }

    function isOverdue(deadlineStr) {
        if (!deadlineStr) return false;
        try {
            const hasTime = deadlineStr.includes('T') && deadlineStr.length > 10;
            const dt = hasTime ? new Date(deadlineStr) : new Date(deadlineStr + 'T23:59:59');
            return dt < new Date();
        } catch { return false; }
    }

    function updateCategories() {
        allCategories = [...new Set(tasks
            .filter(t => t.category && t.category.trim())
            .map(t => t.category.trim()))].sort();
    }

    // ============================================================
    // Render
    // ============================================================
    function renderRevisions(revisions) {
        if (!revisions || !revisions.length) return '';
        return `<div class="revision-history">
            <div style="font-weight:600;margin-bottom:0.5rem;">${t('revisionHistoryLabel')}</div>
            ${revisions.map(rev => `
                <div class="revision-item">
                    <div class="revision-date">${new Date(rev.date).toLocaleString()}</div>
                    <div class="revision-text">${rev.note}</div>
                </div>`).join('')}
        </div>`;
    }

    function renderTaskItem(task, taskList) {
        const li = document.createElement('li');
        li.className = `task-item${task.completed ? ' completed' : ''}`;
        li.dataset.id = task.id;
        const overdue = isOverdue(task.deadline) && !task.completed;
        li.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="task-checkbox"${task.completed ? ' checked' : ''}>
                <div class="task-title${task.completed ? ' completed' : ''}">${task.title}</div>
                <div class="task-actions">
                    <button class="pomodoro-btn" data-id="${task.id}" title="Mulai Fokus (Pomodoro)"><i class="fas fa-stopwatch"></i></button>
                    <span class="pomodoro-timer-display" id="pomodoro-display-${task.id}">25:00</span>
                    <button class="task-btn edit-btn" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                    <button class="task-btn delete-btn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="task-meta">
                <div class="task-deadline${overdue ? ' overdue' : ''}">
                    <i class="fas fa-calendar-alt"></i> ${formatDate(task.deadline)}${overdue ? ' ' + t('overdueLabel') : ''}
                </div>
                <span class="task-priority priority-${task.priority || 'medium'}">${t(task.priority || 'medium')}</span>
                ${task.category ? `<span class="task-priority" style="background-color:var(--secondary);">${task.category}</span>` : ''}
            <div class="task-details">
                <div class="task-details-content">
                    ${renderRevisions(task.revisions)}
                </div>
            </div>`;
        taskList.appendChild(li);

        // Restore active timer state if any
        const savedEndTime = localStorage.getItem(`pomodoro_end_${task.id}`);
        const savedMins = localStorage.getItem(`pomodoro_mins_${task.id}`);
        if (savedEndTime) {
            const now = Date.now();
            const endTime = parseInt(savedEndTime, 10);
            if (endTime > now) {
                const btn = li.querySelector('.pomodoro-btn');
                setTimeout(() => {
                    startPomodoroInterval(task.id, btn, parseInt(savedMins, 10) || 25, endTime);
                }, 100);
            } else {
                localStorage.removeItem(`pomodoro_end_${task.id}`);
                localStorage.removeItem(`pomodoro_mins_${task.id}`);
            }
        }
    }

    function renderTasks() {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('empty-state');
        
        const showEmptyState = () => {
            const p = emptyState.querySelector('p');
            const small = emptyState.querySelector('small');
            if (currentFilter === 'completed') {
                p.textContent = t('noCompletedTasks');
                small.textContent = t('noCompletedTasksHint');
            } else {
                p.textContent = t('noTasks');
                small.textContent = t('noTasksHint');
            }
            emptyState.style.display = 'block';
        };
        taskList.innerHTML = '';

        let filtered = [...tasks];

        if (currentSearch) {
            const q = currentSearch.toLowerCase();
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(q) ||
                (t.brief && t.brief.toLowerCase().includes(q)) ||
                (t.category && t.category.toLowerCase().includes(q))
            );
        }

        const todayStr = getLocalDateStr();
        if (currentFilter === 'all') {
            filtered = filtered.filter(t => t.deadline && t.deadline.startsWith(todayStr) && !t.completed);
        } else if (currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }

        const sortFn = currentSort === 'deadline'
            ? (a, b) => new Date(a.deadline || '9999') - new Date(b.deadline || '9999')
            : currentSort === 'priority'
            ? (a, b) => ({ high:1, medium:2, low:3 }[a.priority] - { high:1, medium:2, low:3 }[b.priority])
            : currentSort === 'byTime'
            ? (a, b) => {
                const aHasTime = a.deadline && a.deadline.includes('T') && a.deadline.length > 10;
                const bHasTime = b.deadline && b.deadline.includes('T') && b.deadline.length > 10;
                if (!aHasTime && !bHasTime) return 0;
                if (!aHasTime) return 1;
                if (!bHasTime) return -1;
                const aTime = a.deadline.split('T')[1];
                const bTime = b.deadline.split('T')[1];
                return aTime.localeCompare(bTime);
              }
            : (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

        if (currentFilter === 'active' && currentActiveSort === 'category') {
            const byCategory = {};
            filtered.forEach(t => {
                const cat = t.category || t('uncategorized');
                if (!byCategory[cat]) byCategory[cat] = [];
                byCategory[cat].push(t);
            });
            if (!Object.keys(byCategory).length) { showEmptyState(); return; }
            emptyState.style.display = 'none';
            Object.keys(byCategory).sort().forEach(cat => {
                const h = document.createElement('h2');
                h.className = 'category-title';
                h.innerHTML = `<i class="fas fa-tag"></i> ${cat}`;
                taskList.appendChild(h);
                byCategory[cat].sort(sortFn).forEach(t => renderTaskItem(t, taskList));
            });
        } else if (currentSort === 'byTime') {
            // Group by hour
            const byTime = {};
            filtered.forEach(t => {
                const time = getTimeFromDeadline(t.deadline);
                const timeKey = time || 'noTime';
                if (!byTime[timeKey]) byTime[timeKey] = [];
                byTime[timeKey].push(t);
            });
            
            const sortedKeys = Object.keys(byTime).sort((a, b) => {
                if (a === 'noTime') return 1;
                if (b === 'noTime') return -1;
                return a.localeCompare(b);
            });
            
            if (!sortedKeys.length) { showEmptyState(); return; }
            emptyState.style.display = 'none';
            
            sortedKeys.forEach(timeKey => {
                const h = document.createElement('h2');
                h.className = 'time-title';
                const displayText = timeKey === 'noTime' ? 'Tanpa Jam' : formatTimeHeader(timeKey);
                h.innerHTML = `<i class="fas fa-clock"></i> ${displayText}`;
                taskList.appendChild(h);
                byTime[timeKey].forEach(t => renderTaskItem(t, taskList));
            });
        } else {
            filtered.sort(sortFn);
            if (!filtered.length) { showEmptyState(); return; }
            emptyState.style.display = 'none';
            filtered.forEach(t => renderTaskItem(t, taskList));
        }

        attachTaskListeners();
    }

    function attachTaskListeners() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const task = tasks.find(t => t.id === btn.dataset.id);
                if (task) openEditForm(task);
            };
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                handleDelete(btn.dataset.id);
            };
        });
        document.querySelectorAll('.task-checkbox').forEach(cb => {
            cb.onchange = () => {
                const taskId = cb.closest('.task-item').dataset.id;
                handleToggleComplete(taskId);
            };
        });
        document.querySelectorAll('.pomodoro-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const taskId = btn.dataset.id;
                togglePomodoro(taskId, btn);
            };
        });
        document.querySelectorAll('.task-header').forEach(header => {
            header.onclick = (e) => {
                if (e.target.closest('button') || e.target.tagName === 'INPUT') return;
                header.closest('.task-item').classList.toggle('expanded');
            };
        });
    }

    // ============================================================
    // CRUD
    // ============================================================
    async function loadAndRender() {
        tasks = await getAllTasks();
        updateCategories();
        renderTasks();
    }

    async function handleAddTask() {
        const title = document.getElementById('task-title').value.trim();
        if (!title) { alert(t('noTitleAlert')); return; }

        const dateVal = document.getElementById('task-deadline').value;
        const hasTime = document.getElementById('task-has-time').checked;
        const timeVal = document.getElementById('task-time').value;
        const deadline = (hasTime && timeVal) ? `${dateVal}T${timeVal}` : dateVal;

        const newTask = {
            id: Date.now().toString(),
            title,
            brief: '',
            category: document.getElementById('task-category').value.trim(),
            priority: document.getElementById('task-priority').value || 'medium',
            deadline,
            completed: false,
            createdAt: new Date().toISOString(),
            revisions: [],
            fcm_token: currentFcmToken,
            schedule_time: deadline ? new Date(deadline).toISOString() : null,
            status: 'pending'
        };

        await putTask(newTask);
        animateAddTask();
        closeAddForm();
        await loadAndRender();
    }

    async function handleToggleComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        const updated = { ...task, completed: !task.completed };
        await putTask(updated);
        
        logTaskCompletion(updated.completed);
        
        if (updated.completed) {
            triggerConfetti();
            // showCelebration(); // using confetti now
        }
        await loadAndRender();
    }

    async function handleDelete(taskId) {
        if (!confirm(t('deleteConfirm'))) return;
        await deleteTaskFromDB(taskId);
        await loadAndRender();
    }

    async function handleSaveEdit() {
        if (!currentEditingTask) return;
        const title = document.getElementById('edit-task-title').value.trim();
        if (!title) { alert(t('noTitleAlert')); return; }

        const dateVal = document.getElementById('edit-task-deadline').value;
        const hasTime = document.getElementById('edit-has-time').checked;
        const timeVal = document.getElementById('edit-task-time').value;
        const deadline = (hasTime && timeVal) ? `${dateVal}T${timeVal}` : dateVal;

        const revisionNote = document.getElementById('edit-task-revision').value.trim();
        const updatedTask = {
            ...currentEditingTask,
            title,
            brief: currentEditingTask.brief || '',
            category: document.getElementById('edit-task-category').value.trim(),
            priority: document.getElementById('edit-task-priority').value || 'medium',
            deadline,
        };
        if (revisionNote) {
            updatedTask.revisions = [
                ...(currentEditingTask.revisions || []),
                { date: new Date().toISOString(), note: revisionNote }
            ];
        }

        await putTask(updatedTask);
        closeEditForm();
        await loadAndRender();
    }

    async function exportTXT() {
        const allTasks = await getAllTasks();
        if (!allTasks.length) { alert(t('noExport')); return; }

        let content = `My Task List\n\nGenerated: ${new Date().toLocaleString()}\nTotal: ${allTasks.length}\n\n${'─'.repeat(40)}\n\n`;
        allTasks.forEach((task, i) => {
            content += `${i+1}. ${task.title}\n`;
            content += `   ${t('exportStatus')}: ${task.completed ? t('exportDone') : t('exportPending')}\n`;
            content += `   ${t('exportCategory')}: ${task.category || t('uncategorized')}\n`;
            content += `   ${t('exportPriority')}: ${task.priority.toUpperCase()}\n`;
            content += `   ${t('exportDeadline')}: ${formatDate(task.deadline)}${isOverdue(task.deadline) && !task.completed ? ' ' + t('exportOverdue') : ''}\n`;
            if (task.brief) content += `   ${t('exportDetails')}: ${task.brief}\n`;
            if (task.revisions?.length) {
                content += `   ${t('exportRevisions')}:\n`;
                task.revisions.forEach((r, ri) => {
                    content += `     ${ri+1}. ${new Date(r.date).toLocaleString()}: ${r.note}\n`;
                });
            }
            content += `\n${'─'.repeat(40)}\n\n`;
        });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
        a.download = `tasks_${new Date().toISOString().slice(0,10)}.txt`;
        a.click();
        URL.revokeObjectURL(a.href);
        toggleSettings(false);
    }

    // ============================================================
    // UI Helpers
    // ============================================================
    function openAddForm() {
        document.getElementById('edit-task-form').classList.remove('visible');
        document.getElementById('add-task-backdrop').classList.add('visible');
        document.getElementById('add-task-form').classList.add('visible');
        document.getElementById('fab').style.display = 'none';
        document.getElementById('task-title').focus();
        resetAddForm();
    }

    function closeAddForm() {
        document.getElementById('add-task-backdrop').classList.remove('visible');
        document.getElementById('add-task-form').classList.remove('visible');
        document.getElementById('fab').style.display = 'flex';
        resetAddForm();
    }

    function resetAddForm() {
        ['task-title', 'task-category'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('task-priority').value = 'medium';
        document.getElementById('task-deadline').value = getLocalDateStr();
        const taskHasTime = document.getElementById('task-has-time');
        const taskTimeInput = document.getElementById('task-time');
        if (taskHasTime) taskHasTime.checked = false;
        if (taskTimeInput) { taskTimeInput.value = ''; taskTimeInput.disabled = true; taskTimeInput.style.opacity = '0.5'; }
        document.getElementById('task-category-suggestions').classList.remove('visible');
    }



    function openEditForm(task) {
        currentEditingTask = task;
        document.getElementById('add-task-form').classList.remove('visible');
        document.getElementById('add-task-backdrop').classList.add('visible');
        document.getElementById('edit-task-title').value = task.title;
        // Parse deadline
        const dl = task.deadline || '';
        const hasT = dl.includes('T') && dl.length > 10;
        document.getElementById('edit-task-deadline').value = hasT ? dl.split('T')[0] : dl;
        const editHasTime = document.getElementById('edit-has-time');
        const editTimeInput = document.getElementById('edit-task-time');
        if (hasT) {
            editHasTime.checked = true;
            editTimeInput.value = dl.split('T')[1];
            editTimeInput.disabled = false;
            editTimeInput.style.opacity = '1';
        } else {
            editHasTime.checked = false;
            editTimeInput.value = '';
            editTimeInput.disabled = true;
            editTimeInput.style.opacity = '0.5';
        }
        document.getElementById('edit-task-revision').value = '';
        document.getElementById('edit-task-category').value = task.category || '';
        document.getElementById('edit-task-priority').value = task.priority || 'medium';
        document.getElementById('edit-task-category-suggestions').classList.remove('visible');
        document.getElementById('edit-task-form').classList.add('visible');
    }

    function closeEditForm() {
        document.getElementById('edit-task-form').classList.remove('visible');
        document.getElementById('add-task-backdrop').classList.remove('visible');
        currentEditingTask = null;
    }

    function toggleSettings(show) {
        document.getElementById('settings-panel').classList.toggle('visible', show);
    }



    function showCelebration() {
        const el = document.getElementById('celebration');
        const overlay = document.getElementById('celebration-overlay');
        el.classList.add('show');
        overlay.classList.add('show');
        setTimeout(() => { el.classList.remove('show'); overlay.classList.remove('show'); }, 2000);
    }

    function animateAddTask() {
        const btn = document.getElementById('add-task-btn');
        if (btn) { btn.style.animation = 'glow 1s ease'; setTimeout(() => btn.style.animation = '', 1000); }
    }

    function changeTheme(theme) {
        document.body.className = theme === 'light' ? '' : `${theme}-mode`;
        localStorage.setItem('todo_theme', theme);
        toggleSettings(false);
    }

    function showCategorySuggestions(inputEl, suggestionsEl, mode) {
        const val = inputEl.value.trim().toLowerCase();
        suggestionsEl.innerHTML = '';
        const matches = val
            ? allCategories.filter(c => c.toLowerCase().includes(val))
            : allCategories;
        if (!matches.length) { suggestionsEl.classList.remove('visible'); return; }
        matches.forEach(cat => {
            const div = document.createElement('div');
            div.className = 'category-suggestion';
            div.innerHTML = cat;
            div.addEventListener('mousedown', (e) => {
                e.preventDefault();
                inputEl.value = cat;
                suggestionsEl.classList.remove('visible');
            });
            suggestionsEl.appendChild(div);
        });
        suggestionsEl.classList.add('visible');
    }



    // ============================================================
    // NEW FEATURES (Habits, Pomodoro, Stats)
    // ============================================================
    
    // Confetti
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }

    // Pomodoro
    let activePomodoros = {}; // { taskId: intervalId }
    function togglePomodoro(taskId, btnElement) {
        const display = document.getElementById(`pomodoro-display-${taskId}`);
        if (activePomodoros[taskId]) {
            // Stop
            clearInterval(activePomodoros[taskId]);
            delete activePomodoros[taskId];
            localStorage.removeItem(`pomodoro_end_${taskId}`);
            localStorage.removeItem(`pomodoro_mins_${taskId}`);
            
            btnElement.classList.remove('active');
            display.innerText = "00:00";
            
            // Batalkan alarm di background
            if (window.Android && window.Android.cancelPomodoroAlarm) {
                window.Android.cancelPomodoroAlarm(taskId);
            }
        } else {
            // Tampilkan modal khusus alih-alih prompt bawaan
            currentPomodoroTask = taskId;
            currentPomodoroBtn = btnElement;
            document.getElementById('pomodoro-modal-backdrop').style.display = 'block';
            document.getElementById('pomodoro-modal').style.display = 'block';
            document.getElementById('pomodoro-mins-input').focus();
        }
    }
    
    // Global referensi untuk modal
    let currentPomodoroTask = null;
    let currentPomodoroBtn = null;
    
    function closePomodoroModal() {
        document.getElementById('pomodoro-modal-backdrop').style.display = 'none';
        document.getElementById('pomodoro-modal').style.display = 'none';
    }
    
    document.getElementById('pomodoro-cancel-btn').addEventListener('click', closePomodoroModal);
    document.getElementById('pomodoro-modal-backdrop').addEventListener('click', closePomodoroModal);
    
    document.getElementById('pomodoro-start-btn').addEventListener('click', () => {
        const inputMins = document.getElementById('pomodoro-mins-input').value || 0;
        const inputSecs = document.getElementById('pomodoro-secs-input').value || 0;
        const minutes = parseInt(inputMins, 10);
        const seconds = parseInt(inputSecs, 10);
        const totalSeconds = (minutes * 60) + seconds;
        if (totalSeconds <= 0) return;
        
        closePomodoroModal();
        
        const taskId = currentPomodoroTask;
        const btnElement = currentPomodoroBtn;
        const display = document.getElementById(`pomodoro-display-${taskId}`);
        
        btnElement.classList.add('active');
        let timeLeft = totalSeconds;
        
        // Tampilkan waktu awalnya langsung
        const initialM = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const initialS = (timeLeft % 60).toString().padStart(2, '0');
        display.innerText = `${initialM}:${initialS}`;
        
        // Daftarkan alarm ke background Android
        let taskTitle = "Tugas Fokus";
        if (String(taskId).startsWith('habit-')) {
            const hId = String(taskId).replace('habit-', '');
            const habitObj = habits.find(h => String(h.id) === hId);
            if (habitObj) taskTitle = habitObj.name;
        } else {
            const taskObj = tasks.find(t => String(t.id) === String(taskId));
            if (taskObj) taskTitle = taskObj.title;
        }
        
        if (window.Android && window.Android.schedulePomodoroAlarm) {
            window.Android.schedulePomodoroAlarm(totalSeconds, taskId, taskTitle);
        }
        
        startPomodoroInterval(taskId, btnElement, totalSeconds);
    });
    function startPomodoroInterval(taskId, btnElement, totalSeconds, savedEndTime = null) {
        const display = document.getElementById(`pomodoro-display-${taskId}`);
        const endTime = savedEndTime ? savedEndTime : Date.now() + (totalSeconds * 1000);
        
        if (!savedEndTime) {
            localStorage.setItem(`pomodoro_end_${taskId}`, endTime.toString());
            localStorage.setItem(`pomodoro_mins_${taskId}`, totalSeconds.toString());
        }
        
        btnElement.classList.add('active');
        
        activePomodoros[taskId] = setInterval(() => {
            const now = Date.now();
            let timeLeft = Math.round((endTime - now) / 1000);
            
            if (timeLeft <= 0) {
                clearInterval(activePomodoros[taskId]);
                delete activePomodoros[taskId];
                localStorage.removeItem(`pomodoro_end_${taskId}`);
                localStorage.removeItem(`pomodoro_mins_${taskId}`);
                
                btnElement.classList.remove('active');
                display.innerText = "Selesai!";
                triggerConfetti();
                
                // Mainkan suara via Android HANYA jika waktu selesainya belum lewat jauh (maksimal 5 detik lewat)
                // Jika lebih dari 5 detik, berarti alarm background sudah bunyi saat aplikasi ditutup
                if (now - endTime < 5000) {
                    if (window.Android && window.Android.playPomodoroSound) {
                        window.Android.playPomodoroSound();
                    }
                    alert(`Selamat! Waktu fokus selesai! Waktunya istirahat.`);
                }
            } else {
                const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                const s = (timeLeft % 60).toString().padStart(2, '0');
                display.innerText = `${m}:${s}`;
            }
        }, 1000);
    }

    // Stats & Badges
    function logTaskCompletion(isCompleting) {
        const today = getLocalDateStr();
        let stats = JSON.parse(localStorage.getItem('todo_stats') || '{}');
        if (isCompleting) {
            stats[today] = (stats[today] || 0) + 1;
        } else {
            stats[today] = Math.max(0, (stats[today] || 0) - 1);
        }
        localStorage.setItem('todo_stats', JSON.stringify(stats));
        
        const weeklyCount = checkBadges();
        if (document.getElementById('stats-modal').classList.contains('visible')) {
            document.getElementById('stats-weekly-count').innerText = weeklyCount;
        }
    }

    function checkBadges() {
        let stats = JSON.parse(localStorage.getItem('todo_stats') || '{}');
        let weeklyTotal = 0;
        const today = new Date();
        for(let i=0; i<7; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const ds = getLocalDateStr(d);
            weeklyTotal += (stats[ds] || 0);
        }
        if (weeklyTotal >= 50 && !localStorage.getItem('badge_50_awarded')) {
            localStorage.setItem('badge_50_awarded', 'true');
            const popup = document.getElementById('badge-popup');
            popup.classList.add('show');
            setTimeout(() => popup.classList.remove('show'), 5000);
        }
        return weeklyTotal;
    }

    // Habits
    let habits = JSON.parse(localStorage.getItem('todo_habits') || '[]');
    function saveHabits() { localStorage.setItem('todo_habits', JSON.stringify(habits)); }
    
    function checkHabitReset() {
        const today = getLocalDateStr();
        const lastReset = localStorage.getItem('todo_habit_last_reset');
        if (lastReset !== today) {
            habits.forEach(h => h.completed = false);
            saveHabits();
            localStorage.setItem('todo_habit_last_reset', today);
        }
    }

    function renderHabits() {
        const list = document.getElementById('habit-list');
        list.innerHTML = '';
        if (habits.length === 0) {
            return;
        }
        habits.forEach(h => {
            const li = document.createElement('li');
            li.className = `task-item ${h.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-header">
                    <input type="checkbox" class="task-checkbox" ${h.completed ? 'checked' : ''} onchange="toggleHabit('${h.id}')">
                    <div class="task-title${h.completed ? ' completed' : ''}">${h.name}</div>
                    <div class="task-actions">
                        <button class="pomodoro-btn" onclick="togglePomodoro('habit-${h.id}', this)" title="Mulai Fokus (Pomodoro)"><i class="fas fa-stopwatch"></i></button>
                        <span class="pomodoro-timer-display" id="pomodoro-display-habit-${h.id}">25:00</span>
                        <button class="task-btn delete-btn" onclick="deleteHabit('${h.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="task-meta">
                    ${h.time ? `<div class="task-deadline"><i class="far fa-clock"></i> ${h.time}</div>` : ''}
                    <span class="task-priority" style="background-color:var(--secondary);">Rutinitas</span>
                </div>
            `;
            
            list.appendChild(li);
            
            // Perbaiki event listener checkbox untuk mengatasi masalah onchange string vs function
            const cb = li.querySelector('.task-checkbox');
            cb.onchange = () => toggleHabit(h.id);
            
            // Perbaiki event listener delete button
            const delBtn = li.querySelector('.delete-btn');
            delBtn.onclick = () => deleteHabit(h.id);
            
            // Perbaiki event listener pomodoro button
            const pomBtn = li.querySelector('.pomodoro-btn');
            pomBtn.onclick = function() { togglePomodoro('habit-' + h.id, this); };
            
            // Restore active pomodoro state for habit if any
            const savedEndTime = localStorage.getItem(`pomodoro_end_habit-${h.id}`);
            const savedMins = localStorage.getItem(`pomodoro_mins_habit-${h.id}`);
            if (savedEndTime) {
                const now = Date.now();
                const endTime = parseInt(savedEndTime, 10);
                if (endTime > now) {
                    setTimeout(() => {
                        startPomodoroInterval('habit-' + h.id, pomBtn, parseInt(savedMins, 10) || 25, endTime);
                    }, 100);
                } else {
                    localStorage.removeItem(`pomodoro_end_habit-${h.id}`);
                    localStorage.removeItem(`pomodoro_mins_habit-${h.id}`);
                }
            }
        });
    }

    window.toggleHabit = function(id) {
        const habit = habits.find(h => h.id === id);
        if (habit) {
            habit.completed = !habit.completed;
            saveHabits();
            renderHabits();
            if (habit.completed) triggerConfetti();
        }
    };

    window.deleteHabit = function(id) {
        habits = habits.filter(h => h.id !== id);
        saveHabits();
        renderHabits();
        if (window.Android && window.Android.cancelHabitAlarm) {
            window.Android.cancelHabitAlarm(id);
        }
    };


    // ============================================================
    // Boot
    // ============================================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Apply saved theme
        const savedTheme = localStorage.getItem('todo_theme');
        if (savedTheme) changeTheme(savedTheme);

        // Apply saved language
        applyLang();

        // Set default deadline
        document.getElementById('task-deadline').value = getLocalDateStr();

        // Initialize Habits
        checkHabitReset();
        renderHabits();
        document.getElementById('add-habit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('new-habit-input');
            const timeInput = document.getElementById('new-habit-time');
            const name = input.value.trim();
            const time = timeInput.value;
            
            if(name) {
                const habitId = Date.now().toString();
                habits.push({ id: habitId, name, completed: false, time: time });
                saveHabits();
                input.value = '';
                timeInput.value = '';
                renderHabits();
                
                // Daftarkan alarm jika ada waktunya
                if (time && window.Android && window.Android.scheduleHabitAlarm) {
                    const [hour, minute] = time.split(':').map(Number);
                    window.Android.scheduleHabitAlarm(hour, minute, habitId, name);
                }
            }
        });

        // Initialize Stats Modal
        document.getElementById('stats-btn').addEventListener('click', () => {
            const weeklyCount = checkBadges();
            document.getElementById('stats-weekly-count').innerText = weeklyCount;
            document.getElementById('stats-modal').classList.add('visible');
            document.getElementById('stats-backdrop').classList.add('visible');
        });
        document.getElementById('close-stats-btn').addEventListener('click', () => {
            document.getElementById('stats-modal').classList.remove('visible');
            document.getElementById('stats-backdrop').classList.remove('visible');
        });

        // Load tasks
        try {
            await loadAndRender();
        } catch (e) {
            console.error('Gagal memuat data dari Supabase:', e);
        }



        // Filter buttons
        document.getElementById('filter-all').addEventListener('click', async () => {
            currentFilter = 'all';
            document.getElementById('filter-all').classList.add('active');
            document.getElementById('filter-active').classList.remove('active');
            document.getElementById('filter-completed').classList.remove('active');
            renderTasks();
        });
        document.getElementById('filter-active').addEventListener('click', async () => {
            currentFilter = 'active';
            document.getElementById('filter-active').classList.add('active');
            document.getElementById('filter-all').classList.remove('active');
            document.getElementById('filter-completed').classList.remove('active');
            renderTasks();
        });
        document.getElementById('filter-completed').addEventListener('click', async () => {
            currentFilter = 'completed';
            document.getElementById('filter-completed').classList.add('active');
            document.getElementById('filter-all').classList.remove('active');
            document.getElementById('filter-active').classList.remove('active');
            renderTasks();
        });

        // Sort
        document.getElementById('sort-select').addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderTasks();
        });


        // Search
        document.getElementById('search-btn').addEventListener('click', () => {
            const bar = document.getElementById('search-bar');
            bar.classList.toggle('visible');
            if (bar.classList.contains('visible')) {
                document.getElementById('search-input').focus();
            } else {
                document.getElementById('search-input').value = '';
                currentSearch = '';
                renderTasks();
            }
        });
        document.getElementById('search-input').addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderTasks();
        });

        // FAB & Add form
        document.getElementById('fab').addEventListener('click', openAddForm);
        document.getElementById('cancel-task-btn').addEventListener('click', closeAddForm);
        document.getElementById('add-task-form').addEventListener('click', (e) => e.stopPropagation());
        document.getElementById('add-task-backdrop').addEventListener('click', () => { closeAddForm(); closeEditForm(); });
        document.getElementById('add-task-btn').addEventListener('click', handleAddTask);
        document.getElementById('task-title').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAddTask();
        });



        // Edit form
        document.getElementById('edit-task-form').addEventListener('click', (e) => e.stopPropagation());
        document.getElementById('save-edit-btn').addEventListener('click', handleSaveEdit);
        document.getElementById('cancel-edit-btn').addEventListener('click', closeEditForm);

        // Settings
        document.getElementById('hamburger-menu').addEventListener('click', () => toggleSettings(true));
        document.getElementById('close-settings').addEventListener('click', () => toggleSettings(false));
        document.getElementById('export-all-txt').addEventListener('click', exportTXT);
        document.getElementById('lang-toggle').addEventListener('click', () => { switchLang(); toggleSettings(false); });

        document.getElementById('clear-all-data').addEventListener('click', async () => {
            if (!confirm(t('clearConfirm'))) return;
            await clearAllTasksFromDB();
            await loadAndRender();
            toggleSettings(false);
        });

        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.addEventListener('click', () => changeTheme(opt.dataset.theme));
        });

        // Checkbox "Pakai Jam" — Add form
        document.getElementById('task-has-time').addEventListener('change', (e) => {
            const ti = document.getElementById('task-time');
            ti.disabled = !e.target.checked;
            ti.style.opacity = e.target.checked ? '1' : '0.5';
            if (e.target.checked) ti.focus();
        });

        // Checkbox "Pakai Jam" — Edit form
        document.getElementById('edit-has-time').addEventListener('change', (e) => {
            const ti = document.getElementById('edit-task-time');
            ti.disabled = !e.target.checked;
            ti.style.opacity = e.target.checked ? '1' : '0.5';
            if (e.target.checked) ti.focus();
        });

        // Category autocomplete — Add form
        const taskCategoryInput = document.getElementById('task-category');
        const taskCategorySuggestions = document.getElementById('task-category-suggestions');
        taskCategoryInput.addEventListener('input', () => showCategorySuggestions(taskCategoryInput, taskCategorySuggestions));
        taskCategoryInput.addEventListener('focus', () => showCategorySuggestions(taskCategoryInput, taskCategorySuggestions));
        taskCategoryInput.addEventListener('blur', () => setTimeout(() => taskCategorySuggestions.classList.remove('visible'), 150));

        // Category autocomplete — Edit form
        const editCategoryInput = document.getElementById('edit-task-category');
        const editCategorySuggestions = document.getElementById('edit-task-category-suggestions');
        editCategoryInput.addEventListener('input', () => showCategorySuggestions(editCategoryInput, editCategorySuggestions));
        editCategoryInput.addEventListener('focus', () => showCategorySuggestions(editCategoryInput, editCategorySuggestions));
        editCategoryInput.addEventListener('blur', () => setTimeout(() => editCategorySuggestions.classList.remove('visible'), 150));

    });
