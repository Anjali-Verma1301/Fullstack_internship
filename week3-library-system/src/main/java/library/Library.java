
package library;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class Library {

    private List<Book> books;
    private List<Member> members;
    private final FileHandler fileHandler;
    private Map<String, Loan> loans = new HashMap<>();

    
public Library() {
    fileHandler = new FileHandler();
    books = fileHandler.loadBooks();
    members = fileHandler.loadMembers();

    for (Loan loan : fileHandler.loadLoans()) {
        if (!loan.isReturned()) {
            loans.put(loan.getIsbn(), loan);
        }
    }

    System.out.println("Loaded " + books.size() + " books, "
            + members.size() + " members, and "
            + loans.size() + " active loans.");
}


    public boolean addBook(Book book) {
        if (findBookByIsbn(book.getIsbn()) != null) {
            System.out.println("A book with this ISBN already exists.");
            return false;
        }

        books.add(book);
        fileHandler.saveBooks(books);
        System.out.println("Book added successfully.");
        return true;
    }

    public boolean removeBook(String isbn) {
        Book book = findBookByIsbn(isbn);

        if (book == null) {
            System.out.println("Book not found.");
            return false;
        }

        if (!book.isAvailable()) {
            System.out.println("Return the book before removing it.");
            return false;
        }

        books.remove(book);
        fileHandler.saveBooks(books);
        System.out.println("Book removed successfully.");
        return true;
    }

    public Book findBookByIsbn(String isbn) {
        for (Book book : books) {
            if (book.getIsbn().equalsIgnoreCase(isbn)) {
                return book;
            }
        }
        return null;
    }

    public List<Book> searchBooks(String keyword) {
        List<Book> results = new ArrayList<>();
        String search = keyword.toLowerCase();

        for (Book book : books) {
            if (book.getTitle().toLowerCase().contains(search)
                    || book.getAuthor().toLowerCase().contains(search)
                    || book.getIsbn().toLowerCase().contains(search)) {
                results.add(book);
            }
        }

        return results;
    }

    public void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }

        System.out.println("\n=== ALL BOOKS ===");
        for (Book book : books) {
            System.out.println(book);
        }
    }

    public boolean registerMember(Member member) {
        if (findMemberById(member.getId()) != null) {
            System.out.println("A member with this ID already exists.");
            return false;
        }

        members.add(member);
        fileHandler.saveMembers(members);
        System.out.println("Member registered successfully.");
        return true;
    }

    public Member findMemberById(String id) {
        for (Member member : members) {
            if (member.getId().equalsIgnoreCase(id)) {
                return member;
            }
        }
        return null;
    }

    public void displayAllMembers() {
        if (members.isEmpty()) {
            System.out.println("No registered members.");
            return;
        }

        System.out.println("\n=== REGISTERED MEMBERS ===");
        for (Member member : members) {
            System.out.println(member);
        }
    }

    
public boolean borrowBook(String isbn, String memberId) {
    Book book = findBookByIsbn(isbn);
    Member member = findMemberById(memberId);

    if (book == null) {
        System.out.println("Book not found.");
        return false;
    }

    if (member == null) {
        System.out.println("Member not found.");
        return false;
    }

    if (!book.isAvailable()) {
        System.out.println("Book is already borrowed.");
        return false;
    }

    book.setAvailable(false);
    member.borrowBook(book.getIsbn());

    Loan loan = new Loan(book.getIsbn(), member.getId());
loans.put(book.getIsbn(), loan);

fileHandler.saveLoans(new ArrayList<>(loans.values()));

fileHandler.saveBooks(books);
fileHandler.saveMembers(members);

    System.out.println("Book borrowed successfully.");
    System.out.println("Borrower: " + member.getName());
    System.out.println("Borrow date: " + loan.getBorrowDate());
    System.out.println("Due date: " + loan.getDueDate());

    return true;
}

   
public boolean returnBook(String isbn, String memberId) {
    Book book = findBookByIsbn(isbn);
    Member member = findMemberById(memberId);

    if (book == null || member == null) {
        System.out.println("Book or member not found.");
        return false;
    }

    if (book.isAvailable()
            || !member.getBorrowedBooks().contains(book.getIsbn())) {
        System.out.println("This member has not borrowed that book.");
        return false;
    }

    Loan loan = loans.get(book.getIsbn());

    book.setAvailable(true);
    member.returnBook(book.getIsbn());

    if (loan != null) {
        loan.markReturned();

        System.out.println("Book returned successfully.");
        System.out.println("Return date: " + loan.getReturnDate());
        System.out.println("Overdue days: " + loan.getOverdueDays());
        System.out.printf("Fine: Rs. %.2f%n", loan.calculateFine());
    } else {
        System.out.println("Book returned successfully.");
        System.out.println(
                "Loan history is unavailable for this borrowing.");
    }

    loans.remove(book.getIsbn());

    fileHandler.saveLoans(new ArrayList<>(loans.values()));

    fileHandler.saveBooks(books);
    fileHandler.saveMembers(members);

    return true;
}


    public void displayStatistics() {
        long available = books.stream()
                .filter(Book::isAvailable)
                .count();

        System.out.println("\n=== LIBRARY STATISTICS ===");
        System.out.println("Total books: " + books.size());
        System.out.println("Available books: " + available);
        System.out.println("Borrowed books: " + (books.size() - available));
        System.out.println("Registered members: " + members.size());
    }
}
