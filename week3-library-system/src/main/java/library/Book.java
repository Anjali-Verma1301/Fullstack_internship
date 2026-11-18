
package library;

public class Book {
    private String isbn;
    private String title;
    private String author;
    private int year;
    private boolean available;

    public Book(String isbn, String title, String author, int year) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public int getYear() {
        return year;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    @Override
    public String toString() {
        return "ISBN: " + isbn
                + " | Title: " + title
                + " | Author: " + author
                + " | Year: " + year
                + " | Status: "
                + (available ? "Available" : "Borrowed");
    }
}
