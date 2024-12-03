namespace WebApplication2.Models {
    public class ChangeLog {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Operation { get; set; }
        public string ChangedAttribute { get; set; }
        public string OldValue { get; set; } //zmenit na null?
        public string NewValue { get; set; }
        public DateTime ChangeDate { get; set; }
    }

}
