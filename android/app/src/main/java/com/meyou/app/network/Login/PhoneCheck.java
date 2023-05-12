package com.meyou.app.network.Login;

public class PhoneCheck {
    private String data;
    private int totalCount;

    public PhoneCheck(String data, int totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
