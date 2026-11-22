document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const typeFilter = document.getElementById("typeFilter");
    const resetBtn = document.getElementById("resetBtn");
    const recordCount = document.getElementById("recordCount");
    const rows = document.querySelectorAll("#recordsTable tr");

    function filterRecords() {
        const search = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const type = typeFilter.value;

        let visibleCount = 0;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();

            const matchesSearch = text.includes(search);
            const matchesCategory =
                category === "all" || row.dataset.category === category;
            const matchesType =
                type === "all" || row.dataset.type === type;

            const visible =
                matchesSearch && matchesCategory && matchesType;

            row.style.display = visible ? "" : "none";

            if (visible) visibleCount++;
        });

        recordCount.textContent = `${visibleCount} Records`;
    }

    searchInput.addEventListener("input", filterRecords);
    categoryFilter.addEventListener("change", filterRecords);
    typeFilter.addEventListener("change", filterRecords);

    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        categoryFilter.value = "all";
        typeFilter.value = "all";
        filterRecords();
    });

    // Upload Record
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");

    uploadBtn.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            alert("Selected file: " + fileInput.files[0].name);
        }
    });

    // Condition filters
    document.querySelectorAll(".condition-row").forEach(row => {
        row.addEventListener("click", () => {
            const condition = row.textContent.toLowerCase();

            if (condition.includes("diabetes")) {
                categoryFilter.value = "diabetes";
            } else if (condition.includes("hypertension")) {
                categoryFilter.value = "hypertension";
            } else if (condition.includes("all conditions")) {
                categoryFilter.value = "all";
            } else {
                categoryFilter.value = "all";
            }

            filterRecords();
        });
    });

    lucide.createIcons();
});