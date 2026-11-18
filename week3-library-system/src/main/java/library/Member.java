
package library;

import java.util.ArrayList;
import java.util.List;

public class Member {
    private String id;
    private String name;
    private List<String> borrowedBooks;

    public Member(String id, String name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getBorrowedBooks() {
        return new ArrayList<>(borrowedBooks);
    }

    public void borrowBook(String isbn) {
        if (!borrowedBooks.contains(isbn)) {
            borrowedBooks.add(isbn);
        }
    }

    public void returnBook(String isbn) {
        borrowedBooks.remove(isbn);
    }

    @Override
    public String toString() {
        return "Member ID: " + id
                + " | Name: " + name
                + " | Borrowed Books: " + borrowedBooks.size();
    }
}
