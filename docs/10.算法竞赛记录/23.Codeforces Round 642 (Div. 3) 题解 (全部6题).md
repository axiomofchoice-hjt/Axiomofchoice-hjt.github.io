---
title: Codeforces Round 642 (Div. 3) 题解 (全部6题)
date: 2020-05-15 08:56:00
permalink: /pages/9a311f/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1353>

## A. Most Unstable Array

构造序列 `[0,m,0,0,...]`，取前 `n` 个。

原因：序列之和为 `m`，答案是 `2m` 就已经极限了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
#define int ll
int T,n,m;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m;
        if(n>=3)cout<<m*2<<endl;
        else cout<<m*(n-1)<<endl;
    }
    return 0;
}
```

## B. Two Arrays And Swaps

尽量选 `a` 中最小的 `k` 个和 `b` 中最大的 `k` 个交换，当然如果 `min{a_i} >= max{b_j}` 那就算了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
#define int ll
int T,n,k;
int a[N],b[N];
signed main(){
    cin>>T;
    while(T--){
        ll sum=0;
        cin>>n>>k;
        repeat(i,0,n)cin>>a[i],sum+=a[i];
        repeat(i,0,n)cin>>b[i];
        sort(a,a+n);
        sort(b,b+n,greater<int>());
        repeat(i,0,k){
            if(a[i]>=b[i])break;
            sum+=b[i]-a[i];
        }
        cout<<sum<<endl;
    }
    return 0;
}
```

## C. Board Moves

最终状态当然选择中心了。

最外一圈（正方形边界）上所有格子都与中心距离相同（都是 `(n-1)/2`），一圈一圈计算即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
#define int ll
int T,n;
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        ll ans=0;
        for(int i=n;i>=0;i-=2)
            ans+=(i*i-(i-2)*(i-2))*(i/2);
        cout<<ans<<endl;
    }
    return 0;
}
```

## D. Constructing the Array

别慌，只不过考察了 bfs。

emmm 然后也不需要再强调什么了吧，直接上就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
//#define int ll
int T,n;
int ans[N];
struct op{
    bool operator()(const pii &x,const pii &y){
        return pii(x.second-x.first,-x.first)<pii(y.second-y.first,-y.first);
    }
};
priority_queue<pii,vector<pii>,op> q;
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        q.push({1,n});
        int dcnt=0;
        while(!q.empty()){
            int l=q.top().first,r=q.top().second; q.pop();
            int m=(l+r)/2;
            ans[m]=++dcnt;
            if(l<m)q.push({l,m-1});
            if(m<r)q.push({m+1,r});
        }
        repeat(i,1,n+1)cout<<ans[i]<<' ';
        cout<<endl;
    }
    return 0;
}
```

## E. K-periodic Garland

难顶，也不知道为什么难顶，可能是我看错题了吧。

先考虑把位置模 k 相等的数放到一起，即 `a_m = s_m s_{[m+k]} s_{[m+2k]} ...`。如果一个 `a_i` 通过操作后变成 `00..0011..1100..00`，并且其他 `a_j` 通过操作变成 `0000...`，那就满足了题目中的 k-periodic。

当然第一步统计所有 `a_i` 中 `1` 的个数 `sum`。

我们把 `a_i` 中的字符 `1` 看成数字 `1`，字符 `0` 看成数字 `-1`，问题就变成了求 `a_i` 中最大连续子序列和（令它为 `tans`）（用贪心法，`O(n)`），然后 `sum - tans` 就是当前的最优解。最终答案是 `min_i [sum - tans(a_i)]`（这中间省略了几步原因，我解释不清楚呜呜）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1000010; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
#define int ll
int T,n,k;
string S;
vector<int> a,s;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>k>>S;
        ll ans=1e9,sum=0;
        repeat(i,0,n)sum+=S[i]=='1';
        repeat(i,0,k){
            a.clear();
            for(int j=i;j<n;j+=k)
                a.push_back((S[j]-'0')*2-1);
            int r=0,tans=0,now=0;
            while(r<(int)a.size()){
                now+=a[r++];
                if(now<0)now=0;
                tans=max(tans,now);
            }
            ans=min(ans,sum-tans);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## F. Decreasing Heights

暴力 `O(n^4)`，~~甚至连终测能不能过都不知道~~。

首先，如果确定了 `(0,0)` 位置的值，那就 dp 一下非常轻松（`O(n^2)`）。但是 `(0,0)` 可以为被减为小于等于 `a[0][0]` 的任何值，for 一下显然 t 飞。

我们考虑令 `in[i][j] = a[i][j] - (i+j)`，这样就不用考虑走一步 +1 的规则了。然后 `(0,0)` 的值完全可以选取 `in[i][j]` 中的这些离散值，一共 `O(n^2)` 个这样的值。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=110; typedef long long ll; const int inf=~0u>>2; typedef pair<int,int> pii;
#define int ll
int T,n,m;
int in[N][N],dp[N][N];
set<int> st;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m; st.clear();
        repeat(i,0,n)
        repeat(j,0,m)
            cin>>in[i][j],in[i][j]-=i+j,st.insert(in[i][j]);
        ll ans=1e18;
        for(auto k:st){
            repeat(i,0,n)
            repeat(j,0,m){
                int a=in[i][j]-k;
                dp[i][j]=1e18;
                if(a<0)continue;
                if(i==0 && j==0)dp[i][j]=a;
                if(i!=0)dp[i][j]=min(dp[i][j],dp[i-1][j]+a);
                if(j!=0)dp[i][j]=min(dp[i][j],dp[i][j-1]+a);
            }
            ans=min(ans,dp[n-1][m-1]);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```
