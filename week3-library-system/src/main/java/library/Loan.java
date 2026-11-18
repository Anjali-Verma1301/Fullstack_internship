
package library;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Loan {

    private final String isbn;
    private final String memberId;
    private final LocalDate borrowDate;
    private final LocalDate dueDate;
    private LocalDate returnDate;

    private static final int LOAN_PERIOD_DAYS = 14;
    private static final double FINE_PER_DAY = 5.0;

    
public Loan(String isbn, String memberId) {
    this.isbn = isbn;
    this.memberId = memberId;
    this.borrowDate = LocalDate.now();
    this.dueDate = borrowDate.plusDays(LOAN_PERIOD_DAYS);
    this.returnDate = null;
}

public Loan(
        String isbn,
        String memberId,
        LocalDate borrowDate,
        LocalDate dueDate) {

    this.isbn = isbn;
    this.memberId = memberId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
    this.returnDate = null;
}


    public String getIsbn() {
        return isbn;
    }

    public String getMemberId() {
        return memberId;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public boolean isReturned() {
        return returnDate != null;
    }

    public void markReturned() {
        if (returnDate == null) {
            returnDate = LocalDate.now();
        }
    }
    public void setReturnDate(LocalDate returnDate) {
    this.returnDate = returnDate;
}

    public long getOverdueDays() {
        LocalDate effectiveDate =
                (returnDate != null) ? returnDate : LocalDate.now();

        long days = ChronoUnit.DAYS.between(dueDate, effectiveDate);
        return Math.max(0, days);
    }

    public double calculateFine() {
        return getOverdueDays() * FINE_PER_DAY;
    }

    @Override
    public String toString() {
        return "ISBN: " + isbn
                + " | Member ID: " + memberId
                + " | Borrowed: " + borrowDate
                + " | Due: " + dueDate
                + " | Returned: "
                + (returnDate == null ? "Not returned" : returnDate)
                + " | Overdue days: " + getOverdueDays()
                + " | Fine: Rs. " + calculateFine();
    }
}
