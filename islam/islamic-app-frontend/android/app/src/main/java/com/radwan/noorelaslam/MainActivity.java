package com.radwan.noorelaslam;

import android.os.Bundle;
import android.webkit.WebView; // استيراد مكتبة WebView

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    WebView.setWebContentsDebuggingEnabled(true); // تفعيل تصحيح الأخطاء
    super.onCreate(savedInstanceState);
  }
}
